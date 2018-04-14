import ISequence from './Sequence';

export class Take {

    /**
     * Returns a new sequence consisting of the first `n` elements. All other elements
     * are discarded.
     *
     * @param {number} n
     * @returns {ISequence<T>}
     */
    take<T>(this: ISequence<T>, n: number): ISequence<T> {
        return this.withIndex()
            .takeWhile(it => it.index < n)
            .map(it => it.value);
    }

}
