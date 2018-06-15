export * from 'io-ts';
import * as t from 'io-ts';
import { Lens, Optional } from './Monocle';
import { PathReporter, success as successReporter, failure as failureReporter } from 'io-ts/lib/PathReporter';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
export { PathReporter, successReporter, failureReporter, ThrowReporter };

export const decodeFromAny = <A, O, I>(type: t.Type<A, O, I>) => (a: any): t.TypeOf<typeof type> => {
    const v = type.decode(a);
    ThrowReporter.report(v);
    return v.fold(() => void 0, a1 => a1) as t.TypeOf<typeof type>;
};

/**
 * apply a default value when the value is null.
 * @param type
 * @param defaultValue
 */
export const withDefault = <T extends t.Mixed>(
    type: T, defaultValue: t.OutputOf<T>)
    : t.Type<t.TypeOf<T>, t.OutputOf<T>> => {
    return new t.Type(
        `withDefault(${type.name}, ${JSON.stringify(defaultValue)})`,
        type.is,
        (v, c) => type.validate(v != null ? v : defaultValue, c),
        type.encode
    );
};

/**
 * The type input is number,The output is Date.
 */
export class DateFromNumberType extends t.Type<Date, number> {
    readonly _tag: 'DateFromNumberType' = 'DateFromNumberType';
    constructor() {
        super(
            'DateFromNumber',
            (m): m is Date => m instanceof Date,
            (m, c) => {
                const validation = t.number.validate(m, c);
                if (validation.isLeft()) {
                    return validation as any;
                } else {
                    const n = validation.value;
                    const d = new Date(n);
                    return isNaN(d.getTime()) ? t.failure(n, c) : t.success(d);
                }
            },
            a => a.getTime()
        );
    }
}

export const dateFromNumber = new DateFromNumberType();

/**
 * The type input is ISOString,output type is Date.
 */
export class DateFromISOStringType extends t.Type<Date, string> {
    readonly _tag: 'DateFromISOStringType' = 'DateFromISOStringType';
    constructor() {
        super(
            'DateFromISOString',
            (m): m is Date => m instanceof Date,
            (m, c) => {
                const validation = t.string.validate(m, c);
                if (validation.isLeft()) {
                    return validation as any;
                } else {
                    const s = validation.value;
                    const d = new Date(s);
                    return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d);
                }
            },
            a => a.toISOString()
        );
    }
}

export const dateFromISOString = new DateFromISOStringType();

export type LensesFromProps<P extends t.Props, T extends t.TypeOfProps<P> = t.TypeOfProps<P>> = {
    [K in keyof P]: Lens<T, T[K]>
};
export type OptionalFromNullableProps<P extends t.Props,
    T extends t.TypeOfPartialProps<P> = t.TypeOfPartialProps<P>> = {
        [K in keyof P]: Optional<T, T[K]>
    };
export const lensesFromProps = <P extends t.Props>(props: P): LensesFromProps<P> => {
    const r: any = {};
    Object.keys(props).forEach(k => {
        r[k] = Lens.fromProp<any, typeof k>(k);
    });
    return r;
};
export const lensesFromNullableProps = <P extends t.Props>(props: P): OptionalFromNullableProps<P> => {
    const r: any = {};
    Object.keys(props).forEach(k => {
        r[k] = Optional.fromNullableProp<any, typeof k, typeof k>(k);
    });
    return r;
};
