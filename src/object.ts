import { fromFoldable } from './StrMap';
import { moveAndFillRight, zip, array } from './Array';
import { TManyPropertyName } from './TypeLevel';
import {
    get, has, mapKeys, mapValues, pick, pickBy, merge, toPairs, omit, omitBy, mergeWith
} from 'lodash';
export {
    get, has, mapKeys, mapValues, pick, pickBy, merge, toPairs, omit, omitBy, mergeWith
};
import { ObjectDiff } from './TypeLevel';
export const moveAndFillRightObject = (a: {}) => {
    const keys = Object.keys(a);
    const values = moveAndFillRight(Object.values(a));

    return fromFoldable(array)(zip(keys, values), (existing, b) => existing).value;
};
export const withDefaults = <D extends { [k: string]: any }, A extends D>(defaults: D) => (
    props: ObjectDiff<A, D> = {} as ObjectDiff<A, D>): A => Object.assign({}, defaults, props) as A;
export const withDefaultsF = <D extends object, A extends D, R>(defaults: D) =>
    (C: (prop: A) => R) => (props: ObjectDiff<A, D>): R => {
        return C(withDefaults<D, A>(defaults)(props));
    };

export const _get = (a: TManyPropertyName) => (b: object): any => get(b, a);
/* export const _get = <T>(propName: TManyPropertyName) =>
(a:  object):  T => get(a, propName); */
