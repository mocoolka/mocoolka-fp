import { isNumber } from './isNumber';
/*
 * Determines whether the passed value is NaN .
 */
export const isNaN = (val: any) => !isNumber(val) || $isNaN(Number(val));
/*tslint:disable */
const $isNaN = (val: any) => val != val;
