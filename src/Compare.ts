import { Ord, ordString, ordBoolean, ordNumber, lessThan, greaterThan, lessThanOrEq, greaterThanOrEq } from './Ord';
import { curry, Predicate, flip, not } from './function';
import {
    contains, notContains, ins, notIn, startsWith, endsWith,
    notStartsWith, notEndsWith
} from './string';
export interface Compare<A> {
    eq: Predicate<A>;
    lt: Predicate<A>;
    gt: Predicate<A>;
    lte: Predicate<A>;
    gte: Predicate<A>;
}
export interface TypeCompare<A> {
    eq: (x: A) => Predicate<A>;
    not: (x: A) => Predicate<A>;
    lt: (x: A) => Predicate<A>;
    gt: (x: A) => Predicate<A>;
    lte: (x: A) => Predicate<A>;
    gte: (x: A) => Predicate<A>;
}
export const compareT = <T>(a: Ord<T>): TypeCompare<T> => ({
    eq: curry(a.equals),
    not: (v: T) => not(curry(a.equals)(v)),
    lt: flip(curry(lessThan(a))),
    gt: flip(curry(greaterThan(a))),
    lte: flip(curry(lessThanOrEq(a))),
    gte: flip(curry(greaterThanOrEq(a))),
});
export const compareTValue = <T>(a: Ord<T>) => (v: T): Compare<T> => ({
    eq: curry(a.equals)(v),
    lt: curry(lessThan(a))(v),
    gt: curry(greaterThan(a))(v),
    lte: curry(lessThanOrEq(a))(v),
    gte: curry(greaterThanOrEq(a))(v),
});
export const booleanCompare = ({
    eq: curry(ordBoolean.equals),
    not: (v: boolean) => not(curry(ordBoolean.equals)(v)),
});
export interface TStringCompare extends TypeCompare<string> {
    in: (x: string[] ) => Predicate<string>;
    contains: (x: string ) => Predicate<string>;
    notContains: (x: string ) => Predicate<string>;
    notIn: (x: string[] ) => Predicate<string>;
    startsWith: (x: string ) => Predicate<string>;
    endsWith: (x: string ) => Predicate<string>;
    notStartsWith: (x: string ) => Predicate<string>;
    notEndsWith: (x: string ) => Predicate<string>;
}
export const stringCompare: TStringCompare = {
    ...compareT(ordString),
    in: ins,
    contains, notContains,
    notIn,
    startsWith, endsWith,
    notStartsWith, notEndsWith,
};
export interface ConditionString {
    op: keyof TStringCompare;
    value: string;
}
export const numberCompare = compareT(ordNumber);
