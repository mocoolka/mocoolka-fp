import { fromFoldable } from './StrMap';
import { moveAndFillRight, zip, array } from './Array';
import { Many, PropertyName } from './TypeLevel';
export { get, set, merge, pick, mapKeys, omit, has, forOwn, findKey, result, mapValues, union, throttle } from 'lodash';
import { get } from 'lodash';
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
export type GetProperty = (propName: Many<PropertyName>) => (a: object) => any;
export type ManyPropertyName = Many<PropertyName>;
export const _get = <T>(propName: ManyPropertyName) => (a: object): T => get(a, propName);
/* export const withDefaults = <D extends object, A extends D>(defaults: D) => (props?: ObjectDiff<A, D>): A =>
    Object.assign({}, defaults, props) as A; */
