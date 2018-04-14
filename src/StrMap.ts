export * from 'fp-ts/lib/StrMap';
import { StrMap } from 'fp-ts/lib/StrMap';
export const of = <T>(o: { [name: string]: T }) => new StrMap<T>(o);
