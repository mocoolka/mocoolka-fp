export * from 'fp-ts/lib/function';
import { Predicate } from 'fp-ts/lib/function';
import { array } from 'fp-ts/lib/Array';

/** @function */
export const andArray = <A>(p: Array<Predicate<A>>): Predicate<A> => {
    return b => array.reduce(p, true, (acc, a) => acc && a(b));
};
/** @function */
export const orArray = <A>(p: Array<Predicate<A>>): Predicate<A> => {
    return b => array.reduce(p, false, (acc, a) => acc || a(b));
};
