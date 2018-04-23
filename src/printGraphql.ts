import * as t from './Type';
import { TProperty, TSchema, typeToParseType } from './Schema';
import { Getter } from './Monocle';
import { indent, escapePropertyKey } from './format';
const basicTypeList = {
    string: 'String',
    number: 'Float',
    integer: 'Int',
    boolean: 'Boolean',
    dateFromISOString: 'String',
    dateFromNumber: 'Float',
};
const required = (p: TProperty) => (typeName: string) => typeName + (p.required ? '!' : '');
const getPropertyTypeName = (p: TProperty) => {
    const requiredType = required(p);
    const type = typeToParseType.get(p.type);
    const name = requiredType(p.id ? 'ID' : t.RBasicTypeEnum.is(type.name) ? basicTypeList[type.name] : type.name);
    return type.isArray ? `[ ${name} ]` : name;
};
/* const getTypeName = (name: string) => t.RBasicTypeEnum.is(name) ? basicTypeList[name] : name;

const getPropertyTypeName = (p: TProperty) => {
    let rType: string;
    const requiredType = required(p);
    if (p.id) {
        return 'ID!';
    }
    if (isArray(p.type)) {
        if (p.type.length > 0) {
            rType = `[ ${requiredType(getTypeName(p.type[0]))} ]`;
        } else {
            rType = `[ ${requiredType('String')} ]`;
        }
    } else {
        rType = `${requiredType(getTypeName(p.type))}`;
    }
    return rType;
}; */
/**
 * Get type with string
 */
export const BasicGetter = new Getter<keyof t.IBasicTypeList, string>((name) => basicTypeList[name]);
const printGraphqlProperty = (p: TProperty) => (i: number): string => {
    const rType = getPropertyTypeName(p);
    return `${indent(i)}${escapePropertyKey(p.name)}: ${rType}`;
};
type TPrint = (i: number) => string;

const printGraphqlTypeDeclaration = (name: string, child: TPrint[], description?: string, base?: string) =>
    (i: number): string => {
        return `${indent(i)}type ${name}${base ? ` implements ${base}` : ''} {
${child.map(a => a(i + 1)).join(`\n`)}
${indent(i)}}\n`;
    };
export const printGraphqlSchema = (p: TSchema) => (i: number): string => {
    return printGraphqlTypeDeclaration(p.name, p.properties.map(printGraphqlProperty), p.description, p.base)(0);
};
