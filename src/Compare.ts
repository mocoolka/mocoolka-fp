import { Ord, ordString, ordBoolean, ordNumber, lessThan, greaterThan, lessThanOrEq, greaterThanOrEq } from './Ord';
import { curry, Predicate, flip, not } from './function';
import {
    contains, notContains, ins, notIn, startsWith, endsWith,
    notStartsWith, notEndsWith
} from './string';
import * as t from './Type';
export type CompareBasicType = 'string' | 'boolean' | 'number';

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

export type TBooleanCompare = {
    eq: (v: boolean) => Predicate<boolean>;
    not: (v: boolean) => Predicate<boolean>;
};
const compareBooleanParams: { [P in keyof TBooleanCompare]: CompareBasicType | CompareBasicType[] } = {
    eq: 'boolean',
    not: 'boolean',
};
export const booleanCompare: TBooleanCompare = ({
    eq: curry(ordBoolean.equals),
    not: (v) => not(curry(ordBoolean.equals)(v)),
});
export type TArrayCompare<A extends number | string> = {
    contains: (v: A) => Predicate<A[]>;
    contains_every: (v: A[]) => Predicate<A[]>;
    contains_some: (v: A[]) => Predicate<A[]>;
};
const compareArrayParams =
    (type: t.TBasicTypeEnum): { [P in keyof TArrayCompare<string>]: t.TBasicTypeEnum | t.TBasicTypeEnum[] } => ({
        contains: type,
        contains_every: [type],
        contains_some: [type],
    });
export const arrayCompare: TArrayCompare<number | string> = ({
    contains: (c) => (value): boolean => value.includes(c),
    contains_every: (v) => (value): boolean =>
        value.filter(a => v.includes(a)).length === value.length,
    contains_some: (v) => (value): boolean => value.filter(a => v.includes(a)).length > 0,
});
export interface TStringCompare extends TypeCompare<string> {
    in: (x: string[]) => Predicate<string>;
    contains: (x: string) => Predicate<string>;
    notContains: (x: string) => Predicate<string>;
    notIn: (x: string[]) => Predicate<string>;
    startsWith: (x: string) => Predicate<string>;
    endsWith: (x: string) => Predicate<string>;
    notStartsWith: (x: string) => Predicate<string>;
    notEndsWith: (x: string) => Predicate<string>;
}
const compareStringParams: { [P in keyof TStringCompare]: CompareBasicType | CompareBasicType[] } = {
    eq: 'string',
    not: 'string',
    lt: 'string',
    gt: 'string',
    lte: 'string',
    gte: 'string',
    in: ['string'],
    contains: 'string',
    notContains: 'string',
    notIn: ['string'],
    startsWith: 'string',
    endsWith: 'string',
    notStartsWith: 'string',
    notEndsWith: 'string',
};

export const stringCompare: TStringCompare = {
    ...compareT(ordString),
    in: ins,
    contains,
    notContains,
    notIn,
    startsWith,
    endsWith,
    notStartsWith,
    notEndsWith,
};
export interface TNumberCompare extends TypeCompare<number> {
}
export const numberCompare: TNumberCompare = compareT(ordNumber);

export type TBasicCompareType = {
    string: TStringCompare;
    boolean: TBooleanCompare;
    number: TypeCompare<number>;

};
export type CompareType = CompareBasicType | CompareBasicType[];
export type TCompareType = TBasicCompareType & { array: TArrayCompare<number | string> };

const compareNumberParams = (type: t.TBasicTypeEnum):
    { [P in keyof TNumberCompare]: t.TBasicTypeEnum | t.TBasicTypeEnum[] } => ({
        eq: type,
        not: type,
        lt: type,
        gt: type,
        lte: type,
        gte: type,
    });

export const compareParams = {
    string: compareStringParams,
    boolean: compareBooleanParams,
    number: compareNumberParams('number'),
    array: compareArrayParams,
    dateFromISOString: compareNumberParams('dateFromISOString'),
    dateFromNumber: compareNumberParams('dateFromNumber'),
    integer: compareNumberParams('integer'),
};
export const compare: TCompareType = {
    string: stringCompare,
    boolean: booleanCompare,
    number: numberCompare,
    array: arrayCompare,

};
