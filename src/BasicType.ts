import * as t from './Type';
import { fromObject, StrMap } from './StrMap';
import { isNil } from './predicate';
export { StrMap };
export type mixed = object | number | string | boolean | symbol | undefined | null;
export type Is<A> = (m: mixed) => m is A;
export abstract class Type {
    abstract printStaticInput: (i: number) => string;
    abstract printStatic: (i: number) => string;
    abstract printRuntime: (i: number) => string;
    // readonly kind: any;
    constructor(
        readonly tag: string,
        /** a custom type guard */
        readonly type: any,
        /** a unique name for this runtime type */
        readonly name?: string
    ) { }
}
export abstract class BasicType extends Type {
    constructor(
        tag: string,
        /** a custom type guard */
        readonly type: t.Type<any>,

        readonly inputName: string = name,
        readonly outputName: string = inputName
    ) { super(tag, type); }
    printStaticInput = (i: number) => this.inputName;
    printStatic = (i: number) => this.outputName;
    printRuntime = (i: number) => { return `t.${this.name}`; };
}
export const isBasicType = (a: any): a is BasicType => a instanceof BasicType;
//
// basic types
//

export class NullType extends BasicType {
    readonly kind: 'null' = 'null';
    constructor() {
        super('null', t.null);
    }
}

/** @alias `null` */
export const nullType: NullType = new NullType();

export class UndefinedType extends BasicType {
    readonly kind: 'undefined' = 'undefined';
    constructor() {
        super('undefined', t.undefined);
    }
}

export const undefinedType: UndefinedType = new UndefinedType();

export class AnyType extends BasicType {
    readonly kind: 'any' = 'any';
    constructor() {
        super('any', t.any);
    }
}
// tslint:disable
export const any: AnyType = new AnyType();
// tslint:enable
export class StringType extends BasicType {
    readonly kind: 'string' = 'string';
    constructor() {
        super(
            'string',
            t.string
        );
    }
}
// tslint:disable
export const string: StringType = new StringType();
// tslint:enable
export class NumberType extends BasicType {
    readonly kind: 'number' = 'number';
    constructor() {
        super(
            'number',
            t.number
        );
    }
}
// tslint:disable
export const number: NumberType = new NumberType();
// tslint:enable
export class BooleanType extends BasicType {
    readonly kind: 'boolean' = 'boolean';
    constructor() {
        super(
            'boolean',
            t.boolean
        );
    }
}
// tslint:disable
export const boolean: BooleanType = new BooleanType();
// tslint:enable
export class AnyDictionaryType extends BasicType {
    readonly kind: 'anyDictionary' = 'anyDictionary';
    constructor() {
        super(
            'Dictionary',
            t.Dictionary,
            '{ [key: string]: t.mixed }', '{ [key: string]: t.mixed }'
        );
    }
}

export const anyDictionary: AnyDictionaryType = new AnyDictionaryType();

export class ObjectType extends BasicType {
    readonly kind: 'object' = 'object';
    constructor() {
        super('object', t.object, '{ [key: string]: t.mixed }', '{ [key: string]: t.mixed }');
    }
}

export const object: ObjectType = new ObjectType();
// tslint:disable
export class FunctionType extends BasicType {
    // tslint:enable
    readonly kind: 'function' = 'function';
    constructor() {
        super(
            'Function',
            t.Function
        );
    }
}

export const functionType: FunctionType = new FunctionType();

export class IntegerType extends BasicType {
    readonly kind: 'integer' = 'integer';
    constructor() {
        super('integer', t.Integer, 'number', 'number');
    }
}
export const integer: IntegerType = new IntegerType();

export class DateFromISOStringType extends BasicType {
    readonly kind: 'dateFromISOString' = 'dateFromISOString';
    constructor() {
        super('dateFromISOString', t.dateFromISOString, 'string', 'Date');
    }
}
export const dateFromISOString: DateFromISOStringType = new DateFromISOStringType();

export class DateFromNumberType extends BasicType {
    readonly kind: 'dateFromNumber' = 'dateFromNumber';
    constructor() {
        super('dateFromNumber', t.dateFromNumber, 'number', 'Date');
    }
}
export const dateFromNumber: DateFromNumberType = new DateFromNumberType();

export class AnyArrayType extends BasicType {
    readonly kind: 'anyArray' = 'anyArray';
    constructor() {
        super('Array', t.array(t.any), 't.mixed[]', 't.mixed[]');
    }
}
export const anyArray: AnyArrayType = new AnyArrayType();

export const basicType: { [name: string]: BasicType } = {
    string,
    integer,
    number,
    boolean,
    null: nullType,
    undefined: undefinedType,
    dateFromISOString,
    dateFromNumber,
    any,
    anyArray,
    anyDictionary,
    object,
    function: functionType,
};

export const basicStrMap = fromObject<BasicType>(basicType);
export const fromKind = (kind: keyof typeof basicType) => basicType[kind];

export type BasicTypeEnum =
    | StringType
    | NumberType
    | BooleanType
    | NullType
    | UndefinedType
    | IntegerType
    | AnyType
    | AnyArrayType
    | AnyDictionaryType
    | ObjectType
    | FunctionType
    | DateFromISOStringType
    | DateFromNumberType;
/**
 * The type input is number,The output is Date.
 */
export class BasicTypeFromStringType<A> extends t.Type<BasicType, string> {
    readonly _tag: 'BasicTypeFromStringType' = 'BasicTypeFromStringType';
    constructor() {
        super(
            'BasicTypeFromString',
            (m): m is BasicType => m instanceof BasicType,
            (m, c) => {
                const validation = t.string.validate(m, c);
                if (validation.isLeft()) {
                    return validation as any;
                } else {
                    return isNil(basicType[validation.value]) ?
                        t.failure(validation.value, c) : t.success(basicType[validation.value]);
                }
            },
            a => a.tag
        );
    }
}

export const basicTypeFromString = new BasicTypeFromStringType();
