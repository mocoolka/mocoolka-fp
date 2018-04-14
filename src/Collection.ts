// https://github.com/purescript/purescript-maps

import { SequenceIterator, IterableIterator, MapIterator, FilterIterator } from './collection/SequenceIterator';
import { Bounded } from './Bounded';
import { fold, getMeetSemigroup, getJoinSemigroup } from './Semigroup';
import { array } from './Array';
import { Ord } from './Ord';
import { Setoid } from './Setoid';

import { Predicate, not } from './function';
export const URI = 'Sequence';

export type URI = typeof URI;

/**
 * @data
 * @constructor StrMap
 */
export class Sequence<A> {
    readonly '_A': A;
    readonly '_URI': URI;
    constructor(readonly iterator: SequenceIterator<A>) {

    }
    public forEach = (f: (v: A) => boolean | undefined | null | void) => {
        let found = false;
        while (this.iterator.hasNext()) {
            const step = this.iterator.next();
            if (f(step)) {
                found = true;
                break;
            }
        }
        return found;
    }
    public map = <B>(f: (a: A) => B): Sequence<B> => {
        return of(new MapIterator(f, this.iterator));
    }

    public filter = (predicate: Predicate<A>): Sequence<A> => {
        return of(new FilterIterator(predicate, this.iterator));
    }

}

/**
 * Returns all elements of the sequence as array. If an `array` is passed
 * the elements are appended to the end of the array.
 *
 * @param {Array<T>} array
 * @returns {Array<T>}
 */
export const toArray = <A>(O: Ord<A>) => (seq: Sequence<A>): A[] => toNoSortArray(seq).sort(O.compare);

/**
 * Returns all elements of the sequence as array. If an `array` is passed
 * the elements are appended to the end of the array.
 *
 * @param {Array<T>} array
 * @returns {Array<T>}
 */
export const toNoSortArray = <A>(seq: Sequence<A>): A[] => {
    const result: A[] = [];
    seq.forEach(v => {
        result.push(v);
    });
    return result;
};

/**
 * Returns an iterable representation of the sequence.
 *
 * @returns {Iterable<T>}
 */
export const toIterable = <T>(seq: Sequence<T>): Iterable<T> => {
    const iterator = seq.iterator;
    return {
        [Symbol.iterator](): Iterator<T> {
            return {
                next(): IteratorResult<T> {
                    if (!iterator.hasNext()) {
                        return { done: true, value: undefined } as any as IteratorResult<T>;
                    }
                    const item = iterator.next();
                    return { done: false, value: item } as any as IteratorResult<T>;
                },
            };
        },
    };
};
/** @function */
export const some = <A>(x: Sequence<A>, predicate: Predicate<A>): boolean => {
    return x.forEach(predicate);
};

/** @function */
export const every = <A>(x: Sequence<A>, predicate: Predicate<A>): boolean =>
    !some(x, not(predicate));
/**
 * Test if a value is a member of a set
 * @function
 */
export const member = <A>(S: Setoid<A>) => (x: Sequence<A>) => (a: A): boolean =>
    some(x, (ax: A) => S.equals(a, ax));

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
export const min = <A>(B: Bounded<A>) => (x: Sequence<A>) => _min(B)(toArray(B)(x));
export const max = <A>(B: Bounded<A>) => (x: Sequence<A>) => _max(B)(toArray(B)(x));
/**
 * Calculate the number of key/value pairs in a dictionary
 * @function
 */
export const count = <A>(s: Sequence<A>): number => toNoSortArray(s).length;

export const reduce = <A, B>(fa: Sequence<A>, b: B, f: (b: B, a: A) => B): B => array.reduce(toNoSortArray(fa), b, f);

export const isSequence = <T>(object: any): object is Sequence<T> => object instanceof Sequence;
export const of = <A>(iterator: SequenceIterator<A>) => new Sequence<A>(iterator);

export const fromIterable = <A>(iterable: Iterable<A>) => of(new IterableIterator(iterable));

export const empty = <T>() => fromIterable([] as T[]);

/**
 * Performs the given `action` (side-effect) for each element of the iterator.
 * @param iterator
 * @param fn
 */
export const forEach = <A>(sequence: Sequence<A>, predicate: (v: A) => boolean) => sequence.forEach(predicate);

export const map = <A, B>(sequence: Sequence<A>, f: (a: A) => B) => sequence.map(f);

export const filter = <A>(sequence: Sequence<A>, predicate: (v: A) => boolean) => sequence.filter(predicate);
