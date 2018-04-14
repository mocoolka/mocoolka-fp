export * from 'fp-ts/lib/Setoid';
import { strictEqual, Setoid } from 'fp-ts/lib/Setoid';
export const setoidStrict = { equals: strictEqual };
/** @instance */
export const setoidAny: Setoid<any> = setoidStrict;
