export declare type KeyofType = string | number | symbol;
export declare type StringOmit<L1 extends KeyofType, L2 extends KeyofType> = ({
    [P in L1]: P;
} & {
        [P in L2]: never;
    } & {
    [key: string]: never;
})[L1];
export declare type StringIntersection<L1 extends string, L2 extends string> = StringOmit<L1, StringOmit<L1, L2>>;

export declare type ObjectOverwrite<O1, O2> = Pick<O1, StringOmit<keyof O1, keyof O2>> & O2;
export declare type ObjectOmit<O, K extends KeyofType> = Pick<O, StringOmit<keyof O, K>>;
export declare type ObjectDiff<O1 extends O2, O2> = ObjectOmit<O1, keyof O2> & Partial<O2>;
export declare type ObjectClean<T> = Pick<T, keyof T>;
export declare type ObjectOptional<O, K extends keyof O> = ObjectOmit<O, K> & Partial<Pick<O, K>>;
export declare type ObjectAbbr<O extends {[key: string]: any}, A extends {[k: string]:
     Extract<keyof O, string>}> = O & {[m in (keyof A) ]: O[A[m]]};
export declare type ObjectUpdate<O, U extends keyof O, T> = { [k in U]: O[k] | T } & ObjectOmit<O, U>;
export declare type ObjectGet<O, U extends keyof O, T> = { [k in U]: O[k] | T };
export declare type PickExact<O, K extends keyof O> = Pick<O, K> & {
    [K1 in StringOmit<keyof O, K>]?: never;
};
export declare type Required<T> = {
    [P in Purify<keyof T>]: NonNullable<T[P]>;
};
export declare type Purify<T extends KeyofType> = {
    [P in T]: T;
}[T];
export declare type NonNullable<T> = T & {};

export declare type TypeOverride<O, K extends keyof O> = ObjectOverwrite<O, Required<Pick<O, K>>>;

export type Manys<T> = T | T[];
export type TPropertyName = string | number | symbol;
export type TManyPropertyName = string | number |string[]|number[] ;
export type GetProperty = (propName: Manys<TPropertyName>) => (a: object) => any;
