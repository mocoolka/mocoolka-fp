import { getTypeName } from './getTypeName';
/*
 * Determines whether the passed value is a object .
 */
export const isPlainObject = (a: any) => ['object', 'Object'].includes(getTypeName(a));
