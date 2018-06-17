import {
    Ord, ordString, ordBoolean, ordNumber, lessThan,
    greaterThan, lessThanOrEq, greaterThanOrEq
} from './Ord';
import { curry, Predicate, flip, not } from './function';
import {
    contains, notContains, ins, notIn, startsWith, endsWith,
    notStartsWith, notEndsWith
} from './string';

export type TRuntimeBasicType = string | number | boolean;
/**
 * stand type compare.
 * every type include all methods
 */
export interface TypeCompare<A extends TRuntimeBasicType> {
    eq: (x: A) => Predicate<A>;
    not: (x: A) => Predicate<A>;
    lt: (x: A) => Predicate<A>;
    gt: (x: A) => Predicate<A>;
    lte: (x: A) => Predicate<A>;
    gte: (x: A) => Predicate<A>;
}

/**
 * boolean compare type
 */
export interface TBooleanCompare {
    eq: (v: boolean) => Predicate<boolean>;
    not: (v: boolean) => Predicate<boolean>;
}

/**
 * string compare  when param is string value
 */
export interface TStringCompareS extends TypeCompare<string> {
    contains: (x: string) => Predicate<string>;
    notContains: (x: string) => Predicate<string>;
    startsWith: (x: string) => Predicate<string>;
    endsWith: (x: string) => Predicate<string>;
    notStartsWith: (x: string) => Predicate<string>;
    notEndsWith: (x: string) => Predicate<string>;
}
/**
 * string compare  when param is array<string> value
 */
export interface TStringCompareA {
    in: (x: string[]) => Predicate<string>;
    notIn: (x: string[]) => Predicate<string>;
}
/**
 * string compare collection
 */
export interface TStringCompare extends TStringCompareS, TStringCompareA {

}

/**
 * array compare with param is value
 */
export interface TArrayCompareSingleToArray<A extends TRuntimeBasicType> {
    contains: (v: A) => Predicate<A[]>;
}
/**
 * array compare with param is array
 */
export interface TArrayCompareArrayToArray<A extends TRuntimeBasicType> {
    contains_every: (v: A[]) => Predicate<A[]>;
    contains_some: (v: A[]) => Predicate<A[]>;
}
/**
 * array all compare
 */
export interface TArrayCompare<A extends TRuntimeBasicType> extends TArrayCompareSingleToArray<A>,
    TArrayCompareArrayToArray<A> {

}

export interface TNumberCompare extends TypeCompare<number> {
}

export type TBasicCompareType = {
    string: TStringCompare;
    boolean: TBooleanCompare;
    number: TNumberCompare;
};

/**
 *
 * @instance TypeCompare
 */
export const compareT = <T extends TRuntimeBasicType>(a: Ord<T>): TypeCompare<T> => ({
    eq: curry(a.equals),
    not: (v: T) => not(curry(a.equals)(v)),
    lt: flip(curry(lessThan(a))),
    gt: flip(curry(greaterThan(a))),
    lte: flip(curry(lessThanOrEq(a))),
    gte: flip(curry(greaterThanOrEq(a))),
});

export const stringCompareS: TStringCompareS = {
    ...compareT(ordString),
    contains,
    notContains,
    startsWith,
    endsWith,
    notStartsWith,
    notEndsWith,
};
export const stringCompareA: TStringCompareA = {

    in: ins,
    notIn,
};
export const stringCompare: TStringCompare = {
    ...stringCompareS,
    ...stringCompareA,
};

export const arrayCompareSingleToArray: TArrayCompareSingleToArray<TRuntimeBasicType> = ({
    contains: (c) => (value): boolean => value.includes(c),
});
export const arrayCompareArrayToArray: TArrayCompareArrayToArray<TRuntimeBasicType> = ({
    contains_every: (v) => (value): boolean =>
        value.filter(a => v.includes(a)).length === value.length,
    contains_some: (v) => (value): boolean => value.filter(a => v.includes(a)).length > 0,
});
export const arrayCompare: TArrayCompare<TRuntimeBasicType> = {
    ...arrayCompareSingleToArray,
    ...arrayCompareArrayToArray,
};

export const numberCompare: TNumberCompare = compareT(ordNumber);
/**
 * @instance TBooleanCompare
 */
export const booleanCompare: TBooleanCompare = ({
    eq: curry(ordBoolean.equals),
    not: (v) => not(curry(ordBoolean.equals)(v)),
});
export const compare: TBasicCompareType = {
    string: stringCompare,
    boolean: booleanCompare,
    number: numberCompare,
};
