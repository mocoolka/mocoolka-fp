import { fromFoldable } from './StrMap';
import { moveAndFillRight, zip, array } from './Array';
export { get, set, merge, pick, mapKeys, omit, has, forOwn, findKey, result, mapValues, union, throttle } from 'lodash';
export const moveAndFillRightObject = (a: {}) => {
    const keys = Object.keys(a);
    const values = moveAndFillRight(Object.values(a));

    return fromFoldable(array)(zip(keys, values), (existing, b) => existing).value;
};
