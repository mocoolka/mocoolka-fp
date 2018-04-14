import ISequence from './Sequence';

export class SortedDescending {

    /**
     * Returns a new sequence with all elements sorted in reverse (descending) natural order.
     *
     * @returns {ISequence<T>}
     */
    sortedDescending<T>(this: ISequence<T>): ISequence<T> {
        return this.sorted(it => it.reverseOrder());
    }

}
