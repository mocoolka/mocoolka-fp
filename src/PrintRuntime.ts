import * as t from './Type';
import { TProperty, TSchema, isRecursive, typeToParseType } from './Schema';
import { indent, printDescription, escapePropertyKey, escapeString } from './format';
type TPrint = (i: number) => string;
export const getSchemaRuntimeTypeName = (name: string) => `R${name}`;
export const getSchemaStaticTypeName = (name: string) => `T${name}`;
const getPropertyTypeName = (p: TProperty, replaceNames: { [name: string]: string }) => {
    const type = typeToParseType.get(p.type);
    const name = type.isIdentifier ? (replaceNames[type.name] ? replaceNames[type.name] :
        getSchemaRuntimeTypeName(type.name)) : `t.${type.name}`;
    return type.isArray ? `t.array(${name})` : name;
};
/**
 * print Property
 * @param p
 */
export const printProperty = (replaceNames: { [name: string]: string }) => (p: TProperty) => (i: number): string => {
    const rType: string = getPropertyTypeName(p, replaceNames);

    const printType = p.defaultValue ? `t.withDefault(${rType}, ${p.defaultValue})` : rType;
    return `${printDescription(p.description, i)}${indent(i)}${escapePropertyKey(p.name)}: ${printType}`;
};
const splitRuntimeProperty = ',';
const lastRuntimeProperty = ',';
const printPropCombinator = (
    tag: string, properties: TProperty[],
    replaceNames: { [name: string]: string }, name?: string) =>
    (i: number): string => {
        let s = `${indent(i)}t.${tag}({\n`;
        s += properties.map(printProperty(replaceNames)).map(a => a(i + 1)).join(`${splitRuntimeProperty}\n`);
        s += `${properties.length > 0 ? lastRuntimeProperty : ''}\n${indent(i)}}`;
        s += ')';
        return s;
    };
const addRuntimeName = (s: string, name?: string): string => {
    if (name) {
        return `${s} ${escapeString(name)}`;
    }
    return s;
};

const printTypesCombinator =
    (tag: string, child: TPrint[], name?: string) => (i: number): string => {
        const indentation = indent(i + 1);
        let s = `${indentation}t.${tag}([\n`;
        s += child.map(type =>
            `${type(i + 2)}`).join(`${splitRuntimeProperty}\n`);
        s += `${lastRuntimeProperty}\n${indent(i + 1)}]`;
        s = addRuntimeName(s, name);
        s += ')';
        return s;
    };
const recursion = (p: TSchema, child: TPrint) => (i: number): string => {
    return `${indent(i)}t.recursion<${getSchemaStaticTypeName(p.name)}>('${getSchemaRuntimeTypeName(p.name)}', self =>
${child(i)}
${indent(i)})`;
};
const printTypeDeclaration = (name: string, child: TPrint, description?: string) => (i: number): string => {
    return `${printDescription(description, i)}${indent(i)}export const ${name} = t.readonly(
${child(i)}
)`;
};
/**
 * print schema to runtime type.
 * @param p
 */
export const printSchema = (p: TSchema) => (i: number): string => {
    const replaceNames = isRecursive(p) ? { [p.name]: 'self' } : {};
    const required = printPropCombinator('strict', p.properties.filter(a => a.required), replaceNames);
    const partial = printPropCombinator('partial', p.properties.filter(a => !a.required), replaceNames);
    const intersection = printTypesCombinator('intersection', [required, partial]);
    const type = isRecursive(p) ? recursion(p, intersection) : intersection;
    return printTypeDeclaration(getSchemaRuntimeTypeName(p.name), type, p.description)(0) + ';';
};
