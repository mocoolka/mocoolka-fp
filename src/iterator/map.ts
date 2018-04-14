import SequenceIterator from './SequenceIterator';
import ISequence, {of} from './Sequence';

export class MapIterator<S, T> implements SequenceIterator<T> {
    constructor(
        private readonly transform: (item: S) => T,
        private readonly iterator: SequenceIterator<S>
    ) {}

    hasNext(): boolean {
        return this.iterator.hasNext();
    }

    next(): T {
        const item = this.iterator.next();
        return this.transform(item);
    }
}

export class Map {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     *
     * @param {(T) => S} transform
     * @returns {ISequence<S>}
     */
    map<S, T>(this: ISequence<T>, transform: (element: T) => S): ISequence<S> {
        return of(new MapIterator(transform, this.iterator));
    }

}
