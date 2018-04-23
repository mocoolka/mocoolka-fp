import {
    mapIterator, filterIterator, arrayIterator, objectIteratorValues, getIterator,
    sliceIterator
} from './i/iterator';
import { Bounded } from './Bounded';
import { get as _get } from './object';
import { fold, getMeetSemigroup, getJoinSemigroup } from './Semigroup';
import { array, insertAt, unsafeInsertAt } from './Array';
import { Ord } from './Ord';
import { Setoid, setoidAny } from './Setoid';
import * as option from './Option';
import {
    isUndefined, isArray, isIterable, isIterator,
    TPlainObject,
    isNil, isPlainObject, isNumber
} from './predicate';
import { Predicate, not } from './function';
import { Sequence } from './Cols';

export const URI = 'List';

export type URI = typeof URI;
export class List<A> {
    readonly '_A': A;
    readonly '_URI': URI;
    readonly _tag: 'ListArray' = 'ListArray';
    readonly size: number;
    constructor(
        protected value: A[]
    ) {
        this.size = value.length;
    }
    public static of = <T>(a: T[]) => new List<T>(a);
    toSeq = <B>(iterator: Iterator<B>, reverseIterator?: Iterator<B>) =>
        new Sequence<B>(this.prop as TSequenceProps<any>, iterator, reverseIterator)

    /**
     * Returns the value associated with the provided key, or none if the Collection does not contain this key.
     * @param key
     */
    public get(index: number) {
        const i = index < 0 ? this.size + index : index;
        return this.has(index) ? option.some(this.value[i]) : option.none;
    }

    /**
     * True if a index exists within this List
     * @param index
     */
    public has(index: number) {
        return index >= 0 && index < this.size;
    }

    public insert = (i: number, a: A): List<A> => List.of(unsafeInsertAt(i, a, this.value));

    public insertT = (i: number, a: A): List<A> => {
        return i < 0 || i > this.size? option.none : option.some(unsafeInsertAt(i, a, as))
        List.of(unsafeInsertAt(i, a, this.value));
    }

}