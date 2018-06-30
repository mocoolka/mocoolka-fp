import * as t from './Type';
import * as c from './Compare';
import {  Predicate } from './function';
export type ICompareParams<A extends t.TBasicType, B> = {
    [P in keyof B]: A | A[];
};
const compareBooleanParams: ICompareParams<'boolean', c.TBooleanCompare> = {
    eq: 'boolean',
    not: 'boolean',
};
const compareArrayParamsT = <A extends t.TBasicType>(type: A): ICompareParams<A, c.TArrayCompare<A>> => ({
    contains: type,
    contains_every: [type],
    contains_some: [type],
});

const compareStringParams: ICompareParams<'string', c.TStringCompare> = {
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
const compareNumberParams = <A extends t.TBasicType>(type: A): ICompareParams<A, c.TNumberCompare> => ({
    eq: type,
    not: type,
    lt: type,
    gt: type,
    lte: type,
    gte: type,
});
export const compareParams: { [P in t.TBasicType]: ICompareParams<P, any> } = {
    string: compareStringParams,
    boolean: compareBooleanParams,
    number: compareNumberParams('number'),
    dateFromISOString: compareNumberParams('dateFromISOString'),
    dateFromNumber: compareNumberParams('dateFromNumber'),
    integer: compareNumberParams('integer'),
};
export const compareArrayParams: { [P in t.TBasicType]: ICompareParams<P, any> } = {
    string: compareArrayParamsT('string'),
    boolean: compareArrayParamsT('boolean'),
    number: compareArrayParamsT('number'),
    dateFromISOString: compareArrayParamsT('dateFromISOString'),
    dateFromNumber: compareArrayParamsT('dateFromNumber'),
    integer: compareArrayParamsT('integer'),
};
export const compare: { [P in t.TBasicType]: any } = {
    string: c.stringCompare,
    boolean: c.booleanCompare,
    number: c.numberCompare,
    dateFromISOString: c.numberCompare,
    dateFromNumber: c.numberCompare,
    integer: c.numberCompare,
};
export const getCompareFunction = (type: string, name: string): ((x: any) => Predicate<t.TRuntimeBasicType>) => {
    if (t.RBasicType.is(type)) {
        const a = compare[type];
        const b = a[name];
        if (!b) {
            throw new Error(`Name '${name}' not be found in compare type '${type}'.`);
        }
        return b;
    } else {
        throw new Error(`type '${type}' not be found.`);
    }
};
