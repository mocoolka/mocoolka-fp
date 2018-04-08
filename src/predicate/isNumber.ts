import { getTypeName } from './getTypeName';
/*
 * Determines whether the passed value is number .
 */
export const isNumber = (a: any) => ['number', 'Number'].includes(getTypeName(a));
