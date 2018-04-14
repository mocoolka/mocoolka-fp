import ISequence from './Sequence';

export class FilterNotNull {

    /**
     * Returns a new sequence consisting of all non-null elements.
     *
     * @returns {ISequence<T>}
     */
    filterNotNull<T>(this: ISequence<T | null>): ISequence<T> {
        return this.filter(it => it !== null) as ISequence<T>;
    }

}
