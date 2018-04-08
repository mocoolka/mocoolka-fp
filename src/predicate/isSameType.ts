import { getTypeName } from './getTypeName';
export const isSameType = (a: any, b: any) => getTypeName(a) === getTypeName(b);
