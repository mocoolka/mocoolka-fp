import ISequence from './Sequence';

export class MapIndexed {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     *
     * @param {(index: number, value: T) => R} transform
     * @returns {ISequence<R>}
     */
    mapIndexed<T, R>(this: ISequence<T>, transform: (index: number, value: T) => R): ISequence<R> {
        return this.withIndex()
            .map(it => transform(it.index, it.value));
    }

}
