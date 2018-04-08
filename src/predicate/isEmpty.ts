
import { isArray } from './isArray';
/*
 * Determines whether the passed value is empty.
 */
export const isEmpty = (val: any) => {
  if (val == null) {
    // typeof null == 'object' so we check it first
    return true;
  } else if (typeof val === 'string' || isArray(val)) {
    return !val.length;
  } else if (typeof val === 'object') {
    return Object.keys(val).length === 0;
  } else {
    return true;
  }
};
