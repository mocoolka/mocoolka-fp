/**
 * The iterator used by `Sequence` to iterate over the underlying data.
 */
export interface SequenceIterator<T> {
    hasNext(): boolean;
    next(): T;
}
/**
 * @data
 * @constructor StrMap
 */
export class IterableIterator<T> implements SequenceIterator<T>  {
    private readonly iterator: Iterator<T>;
    private done = false;
    private nextItem: T | undefined;
    constructor(iterable: Iterable<T>) {
        this.iterator = iterable[Symbol.iterator]();
    }
    public hasNext = (): boolean => {
        this.processNext();
        return !this.done;
    }

    public next = (): T => {
        this.processNext();
        const result = this.nextItem!;
        this.nextItem = undefined;
        return result;
    }
    private processNext = () => {
        if (this.done || this.nextItem !== undefined) {
            return;
        }
        const { done, value } = this.iterator.next();
        if (done) {
            this.done = done;
            this.nextItem = undefined;
        } else {
            this.nextItem = value;
        }
    }
}

export class GeneratorIterator<T> implements SequenceIterator<T> {
    private done = false;
    private nextItem: T | undefined;

    constructor(
        private readonly nextFunction: () => T | null | undefined
    ) { }

    public hasNext = (): boolean => {
        this.processNext();
        return !this.done;
    }

    public next = (): T => {
        this.processNext();
        const result = this.nextItem!;
        this.nextItem = undefined;
        return result;
    }

    private processNext = () => {
        if (this.done || this.nextItem !== undefined) {
            return;
        }
        const result = this.nextFunction();
        if (result == null) {
            this.done = true;
        } else {
            this.nextItem = result;
        }
    }
}

export class GeneratorSeedIterator<T> implements SequenceIterator<T> {
    private nextItem: T | undefined = this.seed;
    private prevItem: T | undefined;
    private done = false;

    constructor(
        private readonly seed: T,
        private readonly nextFunction: (value: T) => T | null | undefined
    ) { }

    public hasNext = (): boolean => {
        this.processNext();
        return !this.done;
    }

    public next = (): T => {
        this.processNext();
        const result = this.nextItem!;
        this.prevItem = result;
        this.nextItem = undefined;
        return result;
    }

    private processNext = () => {
        if (this.done || this.nextItem !== undefined || this.prevItem === undefined) {
            return;
        }
        const result = this.nextFunction(this.prevItem);
        if (result == null) {
            this.done = true;
        } else {
            this.prevItem = this.nextItem!;
            this.nextItem = result;
        }
    }
}

export class MapIterator<S, T> implements SequenceIterator<T> {
    constructor(
        private readonly transform: (item: S) => T,
        private readonly iterator: SequenceIterator<S>
    ) { }

    public hasNext = (): boolean => {
        return this.iterator.hasNext();
    }

    public next = (): T => {
        const item = this.iterator.next();
        return this.transform(item);
    }
}

export class FilterIterator<T> implements SequenceIterator<T> {
    private nextItem: T | undefined;
    private done = false;

    constructor(
        private readonly predicate: (item: T) => boolean,
        private readonly iterator: SequenceIterator<T>
    ) { }

    public hasNext = (): boolean => {
        this.processNext();
        return !this.done;
    }

    public next = (): T => {
        this.processNext();
        const result = this.nextItem!;
        this.nextItem = undefined;
        return result;
    }

    private processNext = () => {
        if (this.done || this.nextItem !== undefined) {
            return;
        }
        while (this.iterator.hasNext()) {
            const item = this.iterator.next();
            if (this.predicate(item)) {
                this.nextItem = item;
                return;
            }
        }
        this.done = true;
    }
}
