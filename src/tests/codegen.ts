import { fromSchema, TOutputSchema } from '../codegen';

// list of type declarations
/*
const declarations = [
    t.typeDeclaration('Persons', t.arrayCombinator(t.identifier('Person'))),
    t.typeDeclaration(
        'Person',
        t.interfaceCombinator([t.property('name', t.stringType), t.property('age', t.numberType)])
    ),
];
const sorted = t.sort(declarations);

console.log(sorted.map(d => t.printRuntime(d)).join('\n'));
console.log(sorted.map(d => t.printStatic(d)).join('\n'));
*/

const schema: TOutputSchema = {
    name: 'File',
    properties: {
        id: {
            type: 'string',
            required: true,
            description: 'id',
        },
        name: {
            type: 'string',
            required: true,
            description: 'file name',
        },
        age: {
            type: 'integer',
            required: true,
            description: 'file name',
        },
        size: {
            type: 'number',
            description: 'file name',
            defaultValue: 123,
        },
        isYoung: {
            type: 'boolean',
            description: 'file name',
            defaultValue: true,
        },
        createAt: {
            type: 'dateFromISOString',
        },
        updateAt: {
            type: 'dateFromNumber',
        },
        any: {
            type: 'any',
        },
        object: {
            type: 'object',
        },
        anyDictionary: {
            type: 'anyDictionary',
        },
        anyArray: {
            type: 'anyArray',
        },
    },
};
console.log(fromSchema(schema).printStatic());
console.log(fromSchema(schema).printRuntime());
