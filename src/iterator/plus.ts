import ISequence, {of, isSequence} from './Sequence';
import SequenceIterator, {IterableIterator} from './SequenceIterator';

class AppendIterator<T> implements SequenceIterator<T> {
    constructor(private readonly first: SequenceIterator<T>,
                private readonly second: SequenceIterator<T>) {
    }

    hasNext(): boolean {
        return this.first.hasNext() || this.second.hasNext();
    }

    next(): T {
        return this.first.hasNext()
            ? this.first.next()
            : this.second.next();
    }

}

export class Plus {

    /**
     * Appends the given `element` to the end of the sequence and returns a new sequence.
     *
     * @param {T} element
     * @returns {ISequence<T>}
     */
    plus<T>(this: ISequence<T>, element: T): ISequence<T>;

    /**
     * Appends the given array to the end of the sequence and returns a new sequence.
     *
     * @param {Array<T>} other
     * @returns {ISequence<T>}
     */
    plus<T>(this: ISequence<T>, other: T[]): ISequence<T>;

    /**
     * Appends the given sequence to the end of the sequence and returns a new sequence.
     *
     * @param {ISequence<T>} other
     * @returns {ISequence<T>}
     */
    plus<T>(this: ISequence<T>, other: ISequence<T>): ISequence<T>;

    plus<T>(this: ISequence<T>, data: T | ISequence<T> | T[]): ISequence<T> {
        if (isSequence(data)) {
            return of(new AppendIterator(this.iterator, data.iterator));
        } else if (data instanceof Array) {
            return of(new AppendIterator(this.iterator, new IterableIterator(data)));
        } else {
            return of(new AppendIterator(this.iterator, new IterableIterator([data])));
        }
    }

}
