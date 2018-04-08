import { getTypeName } from './getTypeName';

/*
 * Determines whether the passed value is a string .
 */
export const isString = (a: any) => ['string', 'String'].includes(getTypeName(a));
