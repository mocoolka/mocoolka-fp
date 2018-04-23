export * from 'typelevel-ts';
import { ObjectOverwrite, Required } from 'typelevel-ts';
export declare type TypeOverride<O, K extends keyof O> = ObjectOverwrite<O, Required<Pick<O, K>>>;
