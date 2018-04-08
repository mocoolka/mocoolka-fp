import { getTypeName } from './getTypeName';
/*
 * Determines whether the passed value is a specific "kind".
 * @since v0.1.0
 */
export const isTypeName = (strTypeName: string) => (a: any) => getTypeName(a) === strTypeName;
