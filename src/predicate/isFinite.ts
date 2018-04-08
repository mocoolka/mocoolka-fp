import { isNumber } from './isNumber';
import { isString } from './isString';

/*
 * Determines whether the passed value is Finite.
 */
export const isFinite = (val: any) => {
  let is = false;
  if (isString(val) && val !== '') {
    is = Number.isFinite(parseFloat(val));
  } else if (isNumber(val)) {
    // need to use isNumber because of Number constructor
    is = Number.isFinite(val);
  }

  return is;
};
