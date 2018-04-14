import ISequence from './Sequence';

export class Drop {

    /**
     * Returns a new sequence which discards the first `n` elements;
     *
     * @param {number} n
     * @returns {ISequence<T>}
     */
    drop<T>(this: ISequence<T>, n: number): ISequence<T> {
        return this.withIndex()
            .dropWhile(it => it.index < n)
            .map(it => it.value);
    }

}
