import { isTypeName } from './isTypeName';
/*
 * Determines whether the passed value is a RegExp .
 * Primitive types define immutable values (values, which are incapable of being changed).
 */

export const isRegExp = isTypeName('RegExp');
