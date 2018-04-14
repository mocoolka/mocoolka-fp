import ISequence from './Sequence';

export class SortedBy {

    /**
     * Returns a new sequence with all elements sorted ascending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => R} selector
     * @returns {ISequence<T>}
     */
    sortedBy<T, R>(this: ISequence<T>, selector: (value: T) => R): ISequence<T> {
        return this.sorted(it => it.compareBy(selector));
    }

}
