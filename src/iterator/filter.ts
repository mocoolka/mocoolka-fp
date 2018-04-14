import SequenceIterator from './SequenceIterator';
import ISequence, {of} from './Sequence';

class FilterIterator<T> implements SequenceIterator<T> {
    private nextItem: T | undefined;
    private done = false;

    constructor(
        private readonly predicate: (item: T) => boolean,
        private readonly iterator: SequenceIterator<T>
    ) {}

    hasNext(): boolean {
        this.processNext();
        return !this.done;
    }

    next(): T {
        this.processNext();
        const result = this.nextItem!;
        this.nextItem = undefined;
        return result;
    }

    private processNext() {
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

export class Filter {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(T) => boolean} predicate
     * @returns {ISequence<T>}
     */
    filter<T>(this: ISequence<T>, predicate: (item: T) => boolean): ISequence<T> {
        return of(new FilterIterator(predicate, this.iterator));
    }

}
