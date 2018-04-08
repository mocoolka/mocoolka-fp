import { isNumber } from './isNumber';

/*
 * Determines whether the passed value is a Integer .
 */
export const  isInteger = (val: any) => {
  return isNumber(val) && (val % 1 === 0);
};
