import { getTypeName } from './getTypeName';
/*
 * Determines whether the passed value is a Boolean instance.
 */
export const isBoolean = (a: any) => ['boolean', 'Boolean'].includes(getTypeName(a));
