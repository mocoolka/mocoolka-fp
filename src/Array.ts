
export * from 'fp-ts/lib/Array';
import { unsafeDeleteAt, head, cons, snoc, last, catOptions, modifyAt, findIndex, deleteAt } from 'fp-ts/lib/Array';
import { Predicate, Endomorphism } from 'fp-ts/lib/function';
import { groupBy as _groupBy, uniq as removeduplicate, remove as _remove } from 'lodash';
export { removeduplicate };
import { Bounded, boundedNumber } from './Bounded';
import { fold, getJoinSemigroup, getMeetSemigroup } from './Semigroup';
import { Option } from './Option';
export const modifyByIdWhile = <T>(as: T[], predicate: Predicate<T>, f: Endomorphism<T>) =>
    findIndex(as, predicate).chain(n => modifyAt(as, n, f));
export const deleteByIdWhile = <T>(as: T[], predicate: Predicate<T>) =>
    findIndex(as, predicate).chain(n => deleteAt(n, as));
/**
 * removes the last element from an array and returns that array.
 * @param a
 */
export const deleteLast = (a: any[]) => a.length === 0 ? a : unsafeDeleteAt(a.length - 1, a);
/**
 * removes the first element from an array and returns that array.
 * @param a
 */
export const deleteFirst = (a: any[]) => a.length === 0 ? a : unsafeDeleteAt(0, a);
/**
 * move array forward left or right and fill with first or last value
 * @param a
 * @param n
 */
export const moveAndFillLeftOrRight = (n: -1 | 1) => (a: any[]) => a.length === 0 ? a : n === 1 ?
    cons(head(a).getOrElse(0), deleteLast(a)) : snoc(deleteFirst(a), last(a).getOrElse(0));
export const moveAndFillLeft = moveAndFillLeftOrRight(-1);
export const moveAndFillRight = moveAndFillLeftOrRight(1);
export const timeSelf = (i: number) => <P>(p: P) => (func: ((a: P) => P)) => {
    let value = p;
    while (i-- > 0) {
        value = func(value);
    }
    return value;
};

/* const findIndex = <A>(as: Array<A>, predicate: Predicate<A>): number => {
    const l = as.length;
    let i = 0;
    for (; i < l; i++) {
        if (predicate(as[i])) {
            break;
        }
    }
    return i;
}; */
export const sliceBefore = <A>(predicate: Predicate<A>) => (as: Array<A>): Option<Array<A>> =>
    findIndex(as, predicate).map(i => as.slice(0, i));

export const sliceAfter = <A>(predicate: Predicate<A>) => (as: Array<A>): Option<Array<A>> =>
    findIndex(as, predicate).map(i => as.slice(i + 1));

export const sliceLast = <A>(n: number) => (as: Array<A>): Array<A> => {
    return as.slice(as.length - n);
};

export const sliceFirst = <A>(n: number) => (as: Array<A>): Array<A> => {
    return as.slice(0, n);
};
export const sliceSkip = <A>(n: number) => (as: Array<A>): Array<A> => {
    return as.slice(n);
};
export const groupBy = <A>(a: (b: A) => string) => (as: Array<A>): { [name: string]: A[] } => _groupBy(as, a);

const _min = <A>(B: Bounded<A>): ((as: Array<A>) => A) => fold(getMeetSemigroup(B))(B.top);
const _max = <A>(B: Bounded<A>): ((as: Array<A>) => A) => fold(getJoinSemigroup(B))(B.bottom);
/**
 * get mix value in number'array
 */
export const min = _min(boundedNumber);
/**
 * get max value in number'array
 */
export const max = _max(boundedNumber);
/**
 * concat array with mix length
 * @param v
 * @param s
 */
export const concatMinArray = <A, B>(v: A[], s: B[]) => {
    const length = min([v.length, s.length]);
    const result: Array<[A, B]> = [];
    for (let i = 0; i < length; i++) {
        result.push([v[i], s[i]]);
    }
    return result;
};
/**
 * get first some value in Array<Option>
 * @param r
 */
export const headArrayOption = (r: Array<Option<any>>) => head(catOptions(r));
