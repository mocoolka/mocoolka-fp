import { strmap } from './fp';
const { fromFoldable } = strmap;
import { array as _array } from './fp';
import { moveAndFillRight } from './Array';
export { get, set, merge, pick, mapKeys, omit, has, forOwn, findKey, result, mapValues, union } from 'lodash';
const { zip, array } = _array;
export const moveAndFillRightObject = (a: {}) => {
    const keys = Object.keys(a);
    const values = moveAndFillRight(Object.values(a));

    return fromFoldable(array)(zip(keys, values), (existing, b) => existing).value;
};
