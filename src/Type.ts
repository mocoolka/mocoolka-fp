export * from 'io-ts';
import * as t from 'io-ts';
import { Lens, Optional, Getter } from './Monocle';
import { array } from './Array';
import { PathReporter, success as successReporter, failure as failureReporter } from 'io-ts/lib/PathReporter';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
export { PathReporter, successReporter, failureReporter, ThrowReporter };

export const booleanOrEmpty = t.union([t.boolean, t.null, t.undefined]);
export const stringOrEmpty = t.union([t.string, t.null, t.undefined]);
export const numberOrEmpty = t.union([t.number, t.null, t.undefined]);
export const integer = t.Integer;
export const intOrEmpty = t.union([t.Integer, t.null, t.undefined]);
export const objectOrEmpty = t.union([t.object, t.null, t.undefined]);
export const arrayOrEmpty = <RT extends t.Type<any, any, t.mixed>>(a: RT, name?: string) =>
    t.union([t.array(a, name), t.null, t.undefined]);
export const dictionaryOrEmpty = <D extends t.Type<any, any, t.mixed>, C extends t.Type<any, any, t.mixed>>
    (domain: D, codomain: C, name?: string) => t.union([t.dictionary(domain, codomain), t.null, t.undefined]);
/**
 * union literal with string's array.
 * @param i
 */
export const unionLiterals = (i: string[]) => t.union(array.map(i, t.literal));
export const decodeFromAny = <A, O, I>(type: t.Type<A, O, I>, a: any): t.TypeOf<typeof type> => {
    const v = type.decode(a);
    ThrowReporter.report(v);
    return v.fold(() => void 0, a1 => a1) as t.TypeOf<typeof type>;
};
export const decodeFromInputType = <A, O, I>(type: t.Type<A, O, I>, a: t.InputOf<typeof type>)
    : t.TypeOf<typeof type> => {
    const v = type.decode(a);
    ThrowReporter.report(v);
    return v.fold(() => void 0, a1 => a1) as t.TypeOf<typeof type>;
};
export type DefaultValueF = <T extends t.Mixed, P extends t.AnyProps>(a?: any) => t.OutputOf<T>;
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
 * apply a default value when the value is null.
 * @param type
 * @param defaultValue
 */
/* export const withCalulate = <T extends t.Mixed>(
    type: T, defaultF: DefaultValueF, params: any)
    : t.Type<t.TypeOf<T>, t.OutputOf<T>> => {
    return new t.Type(
        `withCalulate(${type.name})`,
        type.is,
        (v, c) => type.validate(v != null ? v : defaultF(params,c.), c),
        type.encode
    );
}; */
/**
 * apply a default value when the value is null.
 * @param type
 * @param defaultValue
 */
/* export const withCalulate = <T extends t.Mixed, P extends t.AnyProps>(type: T, defaultValue: (t.OutputOf<T>))
    : t.Type<t.TypeOf<T>, t.OutputOf<T>> => {
    return new t.Type(
        `withCalulate(${type.name})`,
        constTrue,
        (v, c) => type.validate(v != null ? v : defaultValue, c),
        type.encode
    );
}; */
//
// set default value with props.The output type isn't partial.
//

/* export class PartialDefaultType<P extends t.AnyProps, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
    readonly _tag: 'PartialDefaultType' = 'PartialDefaultType';
    constructor(
        name: string,
        is: PartialDefaultType<P, A, O, I>['is'],
        validate: PartialDefaultType<P, A, O, I>['validate'],
        serialize: PartialDefaultType<P, A, O, I>['encode'],
        readonly props: P
    ) {
        super(name, is, validate, serialize);
    }
} */
// const undefinedType: t.UndefinedType = new t.UndefinedType();

/* export const partialDefault = <P extends t.Props>(
    props: P,
    name: string = `PartialDefaultType<${getNameFromProps(props)}>`
): PartialDefaultType<P, t.TypeOfProps<P>, t.OutputOfPartialProps<P>, t.mixed> => {
    const keys = Object.keys(props);
    const types = keys.map(key => props[key]);
    const len = keys.length;
    const partials: t.Props = {};
    for (let i = 0; i < len; i++) {
        partials[keys[i]] = t.union([types[i], undefinedType]);
    }
    const partial = t.type(partials);
    return new PartialDefaultType(
        name,
        partial.is as any,
        partial.validate as any,
        useIdentity(types, len)
            ? t.identity
            : a => {
                const s: { [key: string]: any } = {};
                for (let i = 0; i < len; i++) {
                    const k = keys[i];
                    const ak = a[k];
                    if (ak !== undefined) {
                        s[k] = types[i].encode(ak);
                    }
                }
                return s as any;
            },
        props
    );
};

const getNameFromProps = (props: t.Props): string =>
    `{ ${Object.keys(props)
        .map(k => `${k}: ${props[k].name}`)
        .join(', ')} }`;
const useIdentity = (types: t.Any[], len: number): boolean => {
    for (let i = 0; i < len; i++) {
        if (types[i].encode !== t.identity) {
            return false;
        }
    }
    return true;
}; */

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
export const lensesFromIntersection = <A extends t.Props, B extends t.Props>
    (intersection: t.IntersectionType<[t.InterfaceType<A>, t.PartialType<B>]>)
    : { props: LensesFromProps<A>; nullProps: OptionalFromNullableProps<B> } => {
    return {
        props: lensesFromProps(intersection.types[0].props),
        nullProps: lensesFromNullableProps(intersection.types[1].props),
    };
};
export const RBasicTypeEnum = t.union([
    t.literal('string'),
    t.literal('number'),
    t.literal('integer'),
    t.literal('boolean'),
    t.literal('dateFromISOString'),
    t.literal('dateFromNumber'),
]);

export type TBasicTypeEnum = t.TypeOf<typeof RBasicTypeEnum>;
export interface IBasicTypeList {
    string: t.Type<any>;
    number: t.Type<any>;
    integer: t.Type<any>;
    boolean: t.Type<any>;
    dateFromISOString: t.Type<any>;
    dateFromNumber: t.Type<any>;
}
export const basicTypeList: IBasicTypeList = {
    string: t.string,
    number: t.number,
    integer,
    boolean: t.boolean,
    dateFromISOString,
    dateFromNumber,
};
/**
 * Get type with string
 */
export const BasicGetter = new Getter<keyof IBasicTypeList, t.Type<any>>((name) => basicTypeList[name]);
