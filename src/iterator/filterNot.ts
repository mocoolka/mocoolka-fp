import ISequence from './Sequence';

export class FilterNot {

    /**
     * Returns a new sequence consisting of all elements that don't match the given `predicate`.
     *
     * @param {(value: T) => boolean} predicate
     * @returns {ISequence<T>}
     */
    filterNot<T>(this: ISequence<T>, predicate: (value: T) => boolean): ISequence<T> {
        return this.filter((value: T) => !predicate(value));
    }

}
