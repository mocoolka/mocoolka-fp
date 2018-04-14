import ISequence from './Sequence';

export class Reverse {

    /**
     * Returns a new sequence with all elements of the sequence in reverse order.
     *
     * @returns {ISequence<T>}
     */
    reverse<T>(this: ISequence<T>): ISequence<T> {
        return this.withIndex()
            .sortedByDescending(it => it.index)
            .map(it => it.value);
    }

}
