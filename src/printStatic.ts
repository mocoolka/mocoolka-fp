import * as t from './Type';
import { TProperty, TSchema, typeToParseType } from './Schema';
import { indent, escapePropertyKey } from './format';
import { getSchemaStaticTypeName } from './PrintRuntime';
const basicTypeInputList = {
    string: 'string',
    number: 'number',
    integer: 'number',
    boolean: 'boolean',
    dateFromISOString: 'string',
    dateFromNumber: 'number',
};
const basicTypeList = {
    string: 'string',
    number: 'number',
    integer: 'number',
    boolean: 'boolean',
    dateFromISOString: 'Date',
    dateFromNumber: 'Date',
};
const getPropertyTypeName = (isInput: boolean) => (p: TProperty) => {
    const list = isInput ? basicTypeInputList : basicTypeList;
    const type = typeToParseType.get(p.type);
    const name = t.RBasicTypeEnum.is(type.name) ? list[type.name] : getSchemaStaticTypeName(type.name);
    return type.isArray ? `[ ${name} ]` : name;
};
const required = (p: TProperty) => (propName: string) => propName + (p.required ? '' : '?');

const printProperty = (isInput: boolean) => (p: TProperty) => (i: number): string => {
    const rType = getPropertyTypeName(isInput)(p);
    const requiredType = required(p);
    return `${indent(i)}${escapePropertyKey(requiredType(p.name))}: ${rType}`;
};
type TPrint = (i: number) => string;

const printTypeDeclaration = (name: string, child: TPrint[], description?: string, base?: string) =>
    (i: number): string => {
        return `${indent(i)}export interface ${getSchemaStaticTypeName(name)}${base ?
             ` extends ${getSchemaStaticTypeName(base)}` : ''} {
${child.map(a => a(i + 1)).join(`;\n`)}${child.length > 0 ? ';' : ''}\n${indent(i)}}\n`;
    };
export const printSchema = (p: TSchema) => (i: number): string => {
    return printTypeDeclaration(p.name, p.properties.map(printProperty(false)), p.description, p.base)(0);
};
export const printInputSchema = (p: TSchema) => (i: number): string => {
    return printTypeDeclaration(p.name, p.properties.map(printProperty(true)), p.description, p.base)(0);
};
