import ISequence from './Sequence';

export class FilterIndexed {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(index: number, value: T) => boolean} predicate
     * @returns {ISequence<T>}
     */
    filterIndexed<T>(this: ISequence<T>, predicate: (index: number, value: T) => boolean): ISequence<T> {
        return this.withIndex()
            .filter(it => predicate(it.index, it.value))
            .map(it => it.value);
    }

}
