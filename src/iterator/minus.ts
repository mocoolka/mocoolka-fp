import ISequence, {isSequence} from './Sequence';

export class Minus {

    /**
     * Removes the given `data` and returns a new sequence. Data can either be a single element, an array of elements
     * or a sequence of elements.
     *
     * @param {ISequence<T> | Array<T> | T} data
     * @returns {ISequence<T>}
     */
    minus<T>(this: ISequence<T>, data: T | ISequence<T> | T[]): ISequence<T> {
        if (isSequence(data)) {
            const array: T[] = data.toArray();
            return this.filter(it => array.indexOf(it) < 0);
        } else if (data instanceof Array) {
            return this.filter(it => data.indexOf(it) < 0);
        } else {
            return this.filter(it => it !== data);
        }
    }

}
