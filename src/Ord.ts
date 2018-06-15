export * from 'fp-ts/lib/Ord';
import { Ord, fromCompare, ordNumber, ordString, ordBoolean, ordDate } from 'fp-ts/lib/Ord';
import { invert } from 'fp-ts/lib/Ordering';
import { getSemigroup } from 'fp-ts/lib/Ord';
import { Monoid } from './Monoid';
// export const ordDate = fromCompare<Date>((a, b) => ordNumber.compare(a.getTime(), b.getTime()));
export const ordDescDate = fromCompare<Date>((a, b) => invert(ordDate.compare(a, b)));
export const ordDescString = fromCompare<string>((a, b) => invert(ordString.compare(a, b)));
export const ordDescNumber = fromCompare<number>((a, b) => invert(ordNumber.compare(a, b)));
export const ordDescBoolean = fromCompare<boolean>((a, b) => invert(ordBoolean.compare(a, b)));
/**
 * Monoid under array concatenation (`Array<any>`)
 * @instance
 */
export const getOrdMonoid = <A = never>(): Monoid<Ord<A>> => {
    return ({
        ...getSemigroup<A>(),
        empty: {
            equals: (a: A, b: A) => true,
            compare: (a: A, b: A) => 0,
        },
    });
};
