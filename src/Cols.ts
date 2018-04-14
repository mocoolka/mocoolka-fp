// https://github.com/purescript/purescript-maps

import {
    mapIterator, filterIterator, arrayIterator, objectIteratorValues, getIterator,
    sliceIterator
} from './i/iterator';
import { Bounded } from './Bounded';
import { get as _get } from './object';
import { fold, getMeetSemigroup, getJoinSemigroup } from './Semigroup';
import { array } from './Array';
import { Ord } from './Ord';
import { Setoid, setoidAny } from './Setoid';
import * as option from './Option';
import {
    isUndefined, isArray, isIterable, isIterator,
    TPlainObject,
    isNil, isPlainObject, isNumber
} from './predicate';
import { Predicate, not } from './function';
export const URI = 'Sequence';

export type URI = typeof URI;
export type SeqIndexedType<T> =
    T[] | Iterable<T> | Iterator<T> | TPlainObject<T>;
export type SeqInputType<T> = SeqIndexedType<T> | TPlainObject<T>;
export const isIndexedSeq = <T>(a: SeqInputType<T>): a is SeqIndexedType<T> => !isPlainObject(a);
export const isKeyValueSeq = isPlainObject;
export type SeqType = 'array' | 'keyValue' | 'iterator' | 'iterable';
const emptyIterator = getIterator([]);
export type TSequenceProps<A> = {
    readonly value: SeqInputType<A>;
    size: number;
    interKeys: string[];
    interArray: A[];
    interIterator: Iterator<A>;
    interIterable: Iterable<A>;
    interObject: TPlainObject<A>;
    type: string;
};
export class Sequence<A> {
    readonly '_A': A;
    readonly '_URI': URI;
    protected cache?: any[];
    protected entrySeq: any;

    constructor(
        protected prop: TSequenceProps<A>,
        protected readonly iterator: Iterator<A>,
        protected reverseIterator?: Iterator<A>
    ) {
        if (isArray(prop.value)) {
            this.prop.type = 'array';
            this.prop.interArray = prop.value;
        } else if (isPlainObject(prop.value)) {
            this.prop.type = 'keyValue';
            this.prop.interObject = prop.value;
        } else if (isIterable(prop.value)) {
            this.prop.type = 'iterable';
            this.prop.interIterable = prop.value;
        } else if (isIterator(prop.value)) {
            this.prop.type = 'iterator';
            this.prop.interIterator = prop.value;
        }
    }
    toSubSeq = <B>(iterator: Iterator<B>, reverseIterator?: Iterator<B>) =>
        new Sequence<B>(this.prop as TSequenceProps<any>, iterator, reverseIterator)

    /*     static of = <A>(prop: TSequenceProps<A>, iterator: Iterator<A>, reverseIterator?: Iterator<A>) =>
            new Sequence<A>(prop, iterator, reverseIterator) */

    cacheResult() {
        if (isUndefined(this.cache) && this.iterator) {
            this.cache = this.entrySeq().toArray();
            // this.size = this.cache.length;
        }
        return this;
    }
    public count = () => {
        if (this.prop.size === -1) {
            let c = 0;
            this.forEach(a => { c++; });
            this.prop.size = c;
        }
        return this.prop.size;
    }
    public forEach = (f: (v: A) => boolean | undefined | null | void) => {
        let value;
        let found = false;
        while (!({ value } = this.iterator.next()).done) {
            if (f(value)) {
                found = true;
                break;
            }
        }
        return found;
    }
    /**
     * Returns the value associated with the provided key, or none if the Collection does not contain this key.
     * @param key
     */
    public get(key: number | string | string[]) {
        return isNumber(key) ? this.getIndex(key) : this.getValue(key);
    }
    /**
     * Returns the value associated with the provided key, or none if the Collection does not contain this key.
     * @param key
     */
    public getIn(key: number | string) {
        return isNumber(key) ? this.getIndex(key) : this.getValue(key);
    }
    /**
     * True if a key exists within this Collection
     * @param key
     */
    public has(key: number | string | string[]) {
        return isNumber(key) ? this.hasIndex(key) : this.hasKey(key);
    }

    public reverse = () => {
        return this.toSubSeq(this.getReverse(), this.iterator);
    }
    public map = <B>(f: (a: A) => B): Sequence<B> => {
        return this.toSubSeq(mapIterator(f, this.iterator), mapIterator(f, this.getReverse()));
    }

    public filter = (predicate: Predicate<A>): Sequence<A> => {
        return this.toSubSeq(filterIterator(predicate, this.iterator),
            filterIterator(predicate, this.getReverse()));
    }
    public slice = (begin: number, end: number = -1): Sequence<A> => {
        return this.toSubSeq(sliceIterator(begin, end, this.iterator),
            sliceIterator(begin, end, this.getReverse()));
    }
    /**
     * Get the first element in an Sequence, or `None` if the Sequence is empty
     */
    public first = (): option.Option<A> => {
        const { value, done } = this.iterator.next();
        if (done) {
            return option.none;
        } else {
            return option.some(value);
        }
    }
    /**
     *  Get the last element in an Sequence, or `None` if the Sequence is empty
     */
    public last = (): option.Option<A> => last(this);
    public sort = (ord: Ord<A>): Sequence<A> => {
        return sort(ord)(this);
    }
    /**
     * Test if a value is a member of a Sequence
     */
    public includes = (a: A, S: Setoid<A> = setoidAny): boolean => some(this, (ax: A) => S.equals(a, ax));

    protected getReverse(): Iterator<A> {
        if (!this.reverseIterator) {
            this.reverseIterator = arrayIterator(toArray(this), false, true) as (Iterator<A>);
        }
        return this.reverseIterator;
    }
    private getIndex(index: number) {

        if (this.prop.type === 'array') {
            const i = index < 0 ? this.prop.size + index : index;
            return this.hasIndex(index) ? option.some(this.prop.interArray[i]) : option.none;
        } else {
            return option.none;
        }
    }
    private getValue(key: string | string[]) {
        if (this.prop.type === 'keyValue') {
            const v = _get(this.prop.interObject, key);
            return isNil(v) ? option.none : option.some(v);
        } else {
            return option.none;
        }
    }
    private hasIndex(index: number) {
        return this.prop.type === 'array' && this.prop.size !== 0 && index < this.prop.size && index > -this.prop.size;
    }
    private hasKey(key: string | string[]) {
        return !option.isNone(this.getValue(key));
    }

}
export type TIteratorType = 'keys' | 'values' | 'entitys';
export const seq = <T>(value: SeqInputType<T>) => {
    const isIndexed = false;
    const type: TIteratorType = 'values';
    if (isPlainObject(value)) {
        const keys: string[] = Object.keys(value);
        return new Sequence({
            value,
            size: keys.length,
            interKeys: keys,
            interArray: [],
            interIterator: emptyIterator,
            interIterable: [],
            interObject: value,
            type: 'keyValue',
        }, objectIteratorValues(value, type, isIndexed, false, keys) as Iterator<T>,
            objectIteratorValues(value, type, isIndexed, true, keys) as Iterator<T>);
    } else if (isArray(value)) {
        return new Sequence({
            value,
            size: value.length,
            interKeys: [],
            interArray: value,
            interIterator: emptyIterator,
            interIterable: [],
            interObject: {},
            type: 'array',
        }, arrayIterator(value, isIndexed) as Iterator<T>,
            arrayIterator(value, isIndexed, true) as Iterator<T>);
    } else if (isIterator(value)) {
        return new Sequence({
            value,
            size: -1,
            interKeys: [],
            interArray: [],
            interIterator: value,
            interIterable: [],
            interObject: {},
            type: 'iterator',
        }, value);
    } else {
        return new Sequence({
            value,
            size: -1,
            interKeys: [],
            interArray: [],
            interIterator: emptyIterator,
            interIterable: value,
            interObject: {},
            type: 'iterable',
        }, getIterator(value));
    }

};

/**
 * Returns all elements of the sequence as array. If an `array` is passed
 * the elements are appended to the end of the array.
 *
 * @param {Array<T>} array
 * @returns {Array<T>}
 */
export const toSortedArray = <A>(O: Ord<A>) => (x: Sequence<A>): A[] => toArray(x).sort(O.compare);

/**
 * Returns all elements of the sequence as array. If an `array` is passed
 * the elements are appended to the end of the array.
 *
 * @param {Array<T>} array
 * @returns {Array<T>}
 */
export const toArray = <A>(x: Sequence<A>): A[] => {
    const result: A[] = [];
    x.forEach(v => {
        result.push(v);
    });
    return result;
};

/** @function */
export const some = <A>(x: Sequence<A>, predicate: Predicate<A>): boolean => {
    return x.forEach(predicate);
};

/** @function */
export const every = <A>(x: Sequence<A>, predicate: Predicate<A>): boolean =>
    !some(x, not(predicate));
/**
 * Test if a value is a member of a Sequence
 * @functionGet the first element in an Sequence, or `None` if the Sequence is empty
 */
export const includes = <A>(S: Setoid<A>) => (x: Sequence<A>) => (a: A): boolean =>
    some(x, (ax: A) => S.equals(a, ax));
export const member = includes;

/**
 * `true` if and only if every element in the first Sequence
 * is an element of the second Sequence
 * @function
 */
export const subset = <A>(S: Setoid<A>) => (x: Sequence<A>, y: Sequence<A>): boolean =>
    every(x, member(S)(y));

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Sequence<A>> => {
    const subsetS = subset(S);
    return {
        equals: (x, y) => subsetS(x, y) && subsetS(y, x),
    };
};
const _min = <A>(B: Bounded<A>): ((as: A[]) => A) => fold(getMeetSemigroup(B))(B.top);
const _max = <A>(B: Bounded<A>): ((as: A[]) => A) => fold(getJoinSemigroup(B))(B.bottom);
export const min = <A>(B: Bounded<A>) => (x: Sequence<A>) => _min(B)(toSortedArray(B)(x));
export const max = <A>(B: Bounded<A>) => (x: Sequence<A>) => _max(B)(toSortedArray(B)(x));
/**
 * Calculate the number of value in a Sequence
 * @function
 */
export const count = <A>(s: Sequence<A>): number => toArray(s).length;

export const reduce = <A, B>(fa: Sequence<A>, b: B, f: (b: B, a: A) => B): B => array.reduce(toArray(fa), b, f);

/**
 * Get the first element in an Sequence, or `None` if the Sequence is empty
 * @function
 */
export const first = <A>(fa: Sequence<A>): option.Option<A> => fa.first();

/**
 * Get the last element in an Sequence, or `None` if the Sequence is empty
 * @function
 */
export const reverse = <A>(fa: Sequence<A>): Sequence<A> => fa.reverse();

/**
 * Get the last element in an Sequence, or `None` if the Sequence is empty
 * @function
 */
export const last = <A>(fa: Sequence<A>): option.Option<A> => first(reverse(fa));

/**
 * Sort the elements of an Sequence in increasing order, creating a new Sequence
 * @function
 */
export const sort = <A>(ord: Ord<A>): ((as: Sequence<A>) => Sequence<A>) => {
    return as => seq(toArray(as).sort(ord.compare));
};
/**
 * Returns a Map of Collection.Keyeds, grouped by the return value of the grouper function.
 * @param x
 * @param f
 * @function
 */
export const groupBy = <A, B>(x: Sequence<A>, f: ((a: A) => B)): Map<B, A[]> => {
    const group = new Map<B, A[]>();
    forEach(x, (v) => {
        const key = f(v);
        const groupValue = group.get(key);
        if (isNil(groupValue)) {
            group.set(key, [v]);
        } else {
            groupValue.push(v);
        }
    });
    return group;
};
/**
 * Returns the value associated with the provided key, or none if the Collection does not contain this key.
 * @param x
 * @param key
 */
export const get = <A>(x: Sequence<A>, key: string | number | string[]): option.Option<A> => x.get(key);

/**
 * True if a key exists within this Collection
 * @param x
 * @param key
 */
export const has = <A>(x: Sequence<A>, key: string | number | string[]): boolean => x.has(key);

export const isSequence = <T>(object: any): object is Sequence<T> => object instanceof Sequence;
/* export const of = <A>(iterator: Iterator<A>, value: any, reverseIterator: Iterator<A>, size: number) =>
    new Sequence<A>(iterator, value, reverseIterator, size); */

// export const fromIterable = <A>(iterable: Iterable<A>) => of<A>(iterable[Symbol.iterator](), -1);

// export const fromArray = <A>(a: A[]) => of<A>(arrayIterator(a), a, arrayIterator(a, true), a.length);

export const empty = <T>() => seq<T>([]);

/**
 * Performs the given `action` (side-effect) for each element of the iterator.
 * @param iterator
 * @param fn
 */
export const forEach = <A>(sequence: Sequence<A>, f: (v: A) => boolean | void) => sequence.forEach(f);

export const map = <A, B>(sequence: Sequence<A>, f: (a: A) => B) => sequence.map(f);

export const filter = <A>(sequence: Sequence<A>, predicate: (v: A) => boolean) => sequence.filter(predicate);
