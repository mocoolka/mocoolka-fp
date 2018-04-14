import ISequence, {emptySequence, sequenceOf} from './Sequence';

export class MapNotNull {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     * Transformations into `null` values are discarded.
     *
     * @param {(value: T) => R} transform
     * @returns {ISequence<R>}
     */
    mapNotNull<T, R>(this: ISequence<T>, transform: (value: T) => R | null): ISequence<R> {
        return this.flatMap((value: T) => {
            const item = transform(value);
            return item !== null
                ? sequenceOf(item)
                : emptySequence();
        });
    }

}
