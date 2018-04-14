import ISequence from './Sequence';

export class SortedWith {

    /**
     * Returns a new sequence with all elements sorted be the given `compare` function.
     *
     * @param {(a: T, b: T) => number} comparison
     * @returns {ISequence<T>}
     */
    sortedWith<T>(this: ISequence<T>, comparison: (a: T, b: T) => number): ISequence<T> {
        return this.sorted(it => it.compare(comparison));
    }

}
