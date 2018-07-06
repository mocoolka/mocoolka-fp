export * from 'fp-ts/lib/Semigroup';
import {Semigroup} from 'fp-ts/lib/Semigroup';
import { mergeWith } from './object';
import {isArray} from './predicate';
const customizer = (objValue: any, srcValue: any) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  };
/**
 *  Merge array with concat
 */
export const getObjectMSemigroup = <O>(): Semigroup<O> => {
    return {
        concat: (x, y) => {
            return mergeWith(x, y, customizer);
        },
    };
};
