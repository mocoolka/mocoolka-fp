export * from 'fp-ts/lib/Semigroup';
import {Semigroup} from 'fp-ts/lib/Semigroup';
const merge =require('lodash');
/** @function */
export const getObjectMSemigroup = <O>(): Semigroup<O> => {
    return {
        concat: (x, y) => {
            return merge(x, y);
        },
    };
};
