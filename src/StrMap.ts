export * from 'fp-ts/lib/StrMap';
import { StrMap } from 'fp-ts/lib/StrMap';
export const fromObject = <T>(o: { [name: string]: T }) => new StrMap<T>(o);
