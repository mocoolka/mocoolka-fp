import { _get, mapValues } from './object';
import {  Predicate, flip,  compose } from './function';
import { ManyPropertyName } from './TypeLevel';
import * as c from './Compare';
/**
 * compose object get function and basic compare function
 * @todo may this is a function.
 */
function composeObjectCompareSingleToSingle(properyName: ManyPropertyName): <A>(a: (x: A) => Predicate<A>)
    => ((x: A) => (b: object) => boolean) {
    return a => flip(compose(flip(a), _get(properyName)));
}
function composeObjectCompareArrayToSingle(properyName: ManyPropertyName): <A>(a: ((x: A[]) => Predicate<A>))
    => ((x: A[]) => (b: object) => boolean) {
    return a => flip(compose(flip(a), _get(properyName)));
}
function composeObjectCompareSingleToArray(properyName: ManyPropertyName): <A>(a: ((x: A) => Predicate<A[]>))
    => (x: A) => (b: object[]) => boolean {
    return a => (x) => (b) => a(x)(b.map(_get(properyName)));
}
function composeObjectCompareArrayToArray(properyName: ManyPropertyName): <A>(a: ((x: A[]) => Predicate<A[]>))
    => (x: A[]) => (b: object[]) => boolean {
    return a => (x) => (b) => a(x)(b.map(_get(properyName)));
}
/**
 * compare collection when propery type is boolean
 */
export const booleanObjectCompare = mapValues(c.booleanCompare, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareSingleToSingle(properyName)(v);
    };
});
const arrayObjectCompareSingleToArray = mapValues(c.arrayCompareSingleToArray, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareSingleToArray(properyName)(v);
    };
});
const arrayObjectCompareArrayToArray = mapValues(c.arrayCompareArrayToArray, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareArrayToArray(properyName)(v);
    };
});
/**
 * compare collection when propery type is array
 */
export const arrayObjectCompare = {
    ...arrayObjectCompareSingleToArray,
    ...arrayObjectCompareArrayToArray,
};

const stringObjectCompareS = mapValues(c.stringCompareS, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareSingleToSingle(properyName)(v);
    };
});
const stringObjectCompareA = mapValues(c.stringCompareA, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareArrayToSingle(properyName)(v);
    };
});
/**
 * compare collection when propery type is string
 */
export const stringObjectCompare = {
    ...stringObjectCompareS,
    ...stringObjectCompareA,
};
/**
 * compare collection when propery type is number
 */
export const numberObjectCompare = mapValues(c.numberCompare, v => {
    return (properyName: ManyPropertyName) => {
        return composeObjectCompareSingleToSingle(properyName)(v);
    };
});
