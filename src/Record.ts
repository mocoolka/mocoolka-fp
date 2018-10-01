import { Monoid, fold as _fold } from './Monoid';
import { Ord } from './Ord';
import { merge, isEqual, lt, gt } from 'lodash';
export default <T= any>() => {
    const record: Monoid<T> & Ord<T> = {
        concat: (x, y) => merge(x, y),
        empty: {} as T,
        equals: (x, y) => isEqual(x, y),
        compare: (x, y) => lt(x, y) ? -1 : gt(x, y) ? 1 : 0,
    };
    return _fold(record);
};
export const Record = <T= any>() => {
    const record: Monoid<T> & Ord<T> = {
        concat: (x, y) => merge(x, y),
        empty: {} as T,
        equals: (x, y) => isEqual(x, y),
        compare: (x, y) => lt(x, y) ? -1 : gt(x, y) ? 1 : 0,
    };
    return record;
};
