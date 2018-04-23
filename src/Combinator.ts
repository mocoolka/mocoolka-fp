import * as t from './Type';
import { Type } from './BasicType';
import { Property } from './Property';

import { indent, escapeString } from './format';
export type mixed = object | number | string | boolean | symbol | undefined | null;
export type Is<A> = (m: mixed) => m is A;

export abstract class TypeCombinator extends Type {
    // readonly kind: any;
    constructor(
        tag: string,
        /** a custom type guard */
        type: any,

        readonly types: TypeReference[],
        /** a unique name for this runtime type */
        name?: string
    ) { super(tag, type, name); }
    printRuntime = (i: number) => printRuntimeTypesCombinator(i)(this);
}
export abstract class PropCombinator extends Type {
    // readonly kind: any;
    constructor(
        tag: string,
        /** a custom type guard */
        type: any,

        readonly properties: Property[],
        /** a unique name for this runtime type */
        name?: string
    ) { super(tag, type, name); }
    printRuntime = (i: number) => printRuntimePropCombinator(i)(this);
}
//
// basic types
//

export class IntersectionCombinator extends TypeCombinator {
    readonly kind: 'intersection' = 'intersection';
    constructor(types: TypeReference[], name?: string) {
        super('intersection', t.intersection, types, name);
    }
}

export class PartialCombinator extends PropCombinator {
    readonly kind: 'partial' = 'partial';
    constructor(properties: Property[], name?: string) {
        super('partial', t.partial, properties, name);
    }
}
export class PartialDefaultCombinator extends PropCombinator {
    readonly kind: 'partialDefault' = 'partialDefault';
    constructor(properties: Property[], name?: string) {
        super('partialDefault', t.partialDefault, properties, name);
    }
}

export class InterfaceCombinator extends PropCombinator {
    readonly kind: 'interface' = 'interface';
    constructor(properties: Property[], name?: string) {
        super('interface', t.interface, properties, name);
    }
}
export class StrictCombinator extends PropCombinator {
    readonly kind: 'strict' = 'strict';
    constructor(properties: Property[], name?: string) {
        super('strict', t.strict, properties, name);
    }
}

export class Identifier {
    kind: 'identifier' = 'identifier';
    constructor(readonly name: string) { }
    printStaticInput = (i: number) => { return `${this.name}`; };
    printStatic = (i: number) => { return `${this.name}`; };
    printRuntime = (i: number) => { return `${this.name}`; };
}
/** @alias `null` */

export type Combinators =
    | InterfaceCombinator
    | IntersectionCombinator
    | StrictCombinator
    | PartialCombinator
    | PartialDefaultCombinator;
export type TypeReference = Type | Identifier;

const printRuntimePropCombinator = (
    i: number,
    splitRuntimeProperty: string = ',',
    lastRuntimeProperty: string = ',') =>
    (_propCombinator: PropCombinator): string => {
        let s = `t.${_propCombinator.tag}({\n`;
        s += _propCombinator.properties.map(p => p.printRuntime(i + 1)).join(`${splitRuntimeProperty}\n`);
        s += `${lastRuntimeProperty}\n${indent(i)}}`;
        s = addRuntimeName(s, _propCombinator.name);
        s += ')';
        return s;
    };
const addRuntimeName = (s: string, name?: string): string => {
    if (name) {
        return `${s} ${escapeString(name)}`;
    }
    return s;
};

const printRuntimeTypesCombinator = (
    i: number,
    splitRuntimeProperty: string = ',',
    lastRuntimeProperty: string = ','
) => (typeCombinator: TypeCombinator): string => {
    const indentation = indent(i + 1);
    let s = `t.${typeCombinator.tag}([\n`;
    s += typeCombinator.types.map(type =>
        `${indentation}${type.printRuntime(i + 1)}`).join(`${splitRuntimeProperty}\n`);
    s += `${lastRuntimeProperty}\n${indent(i)}]`;
    s = addRuntimeName(s, typeCombinator.name);
    s += ')';
    return s;
};
