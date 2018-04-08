import { array as _array } from './fp';
const { unsafeDeleteAt, head, cons, snoc, last} = _array;
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
