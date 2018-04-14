import ISequence from './Sequence';

export class SortedByDescending {

    /**
     * Returns a new sequence with all elements sorted descending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => R} selector
     * @returns {ISequence<T>}
     */
    sortedByDescending<T, R>(this: ISequence<T>, selector: (value: T) => R): ISequence<T> {
        return this.sorted(it => it.compareByDescending(selector));
    }

}
