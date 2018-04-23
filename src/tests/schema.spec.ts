import {
    RProperty, fromObject, RSchema, isRecursive,
    typeToParseType, propertyWhereGetter, schemaWhereGetter
} from '../Schema';
import { right } from '../Either';
describe('Property', () => {
    it('getProperyType', () => {
        expect(typeToParseType.get('string')).toEqual({
            name: 'string',
            isIdentifier: false,
            isArray: false,
        });
        expect(typeToParseType.get(['string'])).toEqual({
            name: 'string',
            isIdentifier: false,
            isArray: true,
        });
        expect(typeToParseType.get(['Node'])).toEqual({
            name: 'Node',
            isIdentifier: true,
            isArray: true,
        });
        expect(typeToParseType.get('Node')).toEqual({
            name: 'Node',
            isIdentifier: true,
            isArray: false,
        });
    });
    it('RProperty', () => {
        expect(RProperty.decode({
            name: 'k',
            type: 'string',
            required: true,
            description: 'id',
        })).toEqual(right({
            name: 'k',
            type: 'string',
            required: true,
            description: 'id',
        }));
        expect(RProperty.decode({
            name: 'id',
        })).toEqual(right({
            name: 'id',
            type: 'string',
        }));
    });
    it('propertyWhereGetter', () => {
        expect(propertyWhereGetter.get({
            name: 'k',
            type: 'boolean',
        })).toEqual([
            { name: 'k_eq', type: 'boolean' },
            { name: 'k_not', type: 'boolean' }]);
    });
    it('propertyWhereGetter array', () => {
        expect(propertyWhereGetter.get({
            name: 'k',
            type: ['string'],
        })).toEqual(
            [
                { name: 'k_contains', type: 'string' },
                { name: 'k_contains_every', type: ['string'] },
                { name: 'k_contains_some', type: ['string'] },
            ]);
    });
});
describe('Schema', () => {
    it('decode simple schema', () => {
        expect(RSchema.decode({
            name: 'test',
            properties: [],
        })).toEqual(right({
            name: 'test',
            properties: [],
        }));
    });
    it('isRecursive', () => {
        expect(isRecursive({
            name: 'test',
            properties: [],
        })).toEqual(false);
        expect(isRecursive({
            name: 'test',
            properties: [{
                name: 'name',
                type: 'test',
            }],
        })).toEqual(true);
        expect(isRecursive({
            name: 'test',
            properties: [{
                name: 'name',
                id: false,
                type: ['test'],
            }],
        })).toEqual(true);
    });
    it('RSchema', () => {
        expect(RSchema.decode({
            name: 'test',
            properties: [{ name: 'name' }],
        })).toEqual(right({
            name: 'test',
            properties: [
                {
                    name: 'name',
                    type: 'string',
                },
            ],
        }));
    });
    it('fromObject', () => {
        expect(fromObject({
            name: 'test',
            properties: [{ name: 'name' }],
        })).toEqual({
            name: 'test',
            properties: [{
                name: 'name',
                type: 'string',
            }, {
                name: 'id',
                type: 'string',
                id: true,
                required: true,
                unique: true,
            }],
        });
    });
    it('fromObject', () => {
        expect(fromObject({
            name: 'test',
            properties: [{ name: 'name' }],
        })).toEqual({
            name: 'test',
            properties: [{
                name: 'name',
                type: 'string',
            }, {
                name: 'id',
                type: 'string',
                id: true,
                required: true,
                unique: true,
            }],
        });
    });
    it('fromObject', () => {
        expect(schemaWhereGetter.get({
            name: 'test',
            properties: [{ name: 'name', type: 'number' }],
        })).toEqual(
            {
                name: 'testWhere',
                properties: [
                    { name: 'name_eq', type: 'number' },
                    { name: 'name_not', type: 'number' },
                    { name: 'name_lt', type: 'number' },
                    { name: 'name_gt', type: 'number' },
                    { name: 'name_lte', type: 'number' },
                    { name: 'name_gte', type: 'number' },
                ],
            }
        );
    });
});
