import {
    stringObjectCompare,   arrayObjectCompare,  numberObjectCompare, booleanObjectCompare
} from '../ObjectCompare';
import { filter } from 'mocoolka-fp/lib/Array';
describe('Compare', () => {
    it('object string', () => {
        expect(stringObjectCompare.eq('name')('1')({})).toEqual(false);
        expect(stringObjectCompare.eq(['home', 'name'])('1')({ home: { name: '1' } })).toEqual(true);
        expect(stringObjectCompare.eq(['home', 'name'])('1')({ home: { name: 1 } })).toEqual(false);
        expect(stringObjectCompare.eq(['home', 'name'])('1')({ })).toEqual(false);
        expect(stringObjectCompare.eq('name')('1')({ name: '1' })).toEqual(true);
        expect(stringObjectCompare.eq('name')('1')({ name: '2' })).toEqual(false);
        expect(stringObjectCompare.not('name')('1')({ name: '1' })).toEqual(false);
        expect(stringObjectCompare.not('name')('1')({ name: '2' })).toEqual(true);
        expect(stringObjectCompare.lt('name')('1')({ name: '2' })).toEqual(false);
        expect(stringObjectCompare.lt('name')('2')({ name: '1' })).toEqual(true);
        expect(stringObjectCompare.lt('name')('1')({ name: '1' })).toEqual(false);
        expect(stringObjectCompare.lte('name')('1')({ name: '1' })).toEqual(true);
        expect(stringObjectCompare.gt('name')('1')({ name: '2' })).toEqual(true);
        expect(stringObjectCompare.gt('name')('2')({ name: '1' })).toEqual(false);
        expect(stringObjectCompare.gt('name')('1')({ name: '1' })).toEqual(false);
        expect(stringObjectCompare.gte('name')('1')({ name: '1' })).toEqual(true);
        expect(stringObjectCompare.contains('name')('1')({ name: '123' })).toEqual(true);
        expect(stringObjectCompare.notContains('name')('1')({ name: '123' })).toEqual(false);
        expect(stringObjectCompare.in('name')(['1', '2'])({ name: '1' })).toEqual(true);
        expect(stringObjectCompare.notIn('name')(['1', '2'])({ name: '1' })).toEqual(false);
        expect(stringObjectCompare.startsWith('name')('1')({ name: '123' })).toEqual(true);
        expect(stringObjectCompare.notStartsWith('name')('1')({ name: '123' })).toEqual(false);
        expect(stringObjectCompare.endsWith('name')('3')({ name: '123' })).toEqual(true);
        expect(stringObjectCompare.notEndsWith('name')('3')({ name: '123' })).toEqual(false);
        expect(filter([{ name: '1' }, { name: '2' }, { name: '3' }],
            stringObjectCompare.eq('name')('1'))).toEqual([{ name: '1' }]);
        expect(filter([{ name: '1' }, { name: '2' }, { name: '3' }],
            stringObjectCompare.lt('name')('3'))).toEqual([{ name: '1' }, { name: '2' }]);
        expect(filter([{ name: '1' }, { name: '2' }, { name: '3' }],
            stringObjectCompare.gt('name')('1'))).toEqual([{ name: '2' }, { name: '3' }]);
    });
    it('object number', () => {
        expect(numberObjectCompare.eq('value')(1)({ value: 1 })).toEqual(true);
        expect(numberObjectCompare.eq('value')(1)({ value: 2 })).toEqual(false);
        expect(numberObjectCompare.not('value')(1)({ value: 1 })).toEqual(false);
        expect(numberObjectCompare.not('value')(1)({ value: 2 })).toEqual(true);
        expect(numberObjectCompare.lt('value')(1)({ value: 2 })).toEqual(false);
        expect(numberObjectCompare.lt('value')(2)({ value: 1 })).toEqual(true);
        expect(numberObjectCompare.lt('value')(1)({ value: 1 })).toEqual(false);
        expect(numberObjectCompare.lte('value')(1)({ value: 1 })).toEqual(true);
        expect(numberObjectCompare.gt('value')(1)({ value: 2 })).toEqual(true);
        expect(numberObjectCompare.gt('value')(2)({ value: 1 })).toEqual(false);
        expect(numberObjectCompare.gt('value')(1)({ value: 1 })).toEqual(false);
        expect(numberObjectCompare.gte('value')(1)({ value: 1 })).toEqual(true);
        expect(filter([{ value: 1 }, { value: 2 }, { value: 3 }], numberObjectCompare.eq('value')(1)))
            .toEqual([{ value: 1 }]);
        expect(filter([{ value: 1 }, { value: 2 }, { value: 3 }], numberObjectCompare.lt('value')(3)))
            .toEqual([{ value: 1 }, { value: 2 }]);
        expect(filter([{ value: 1 }, { value: 2 }, { value: 3 }], numberObjectCompare.gt('value')(1)))
            .toEqual([{ value: 2 }, { value: 3 }]);
    });
    it('object boolean', () => {
        expect(booleanObjectCompare.eq('is')(true)({ is: true })).toEqual(true);
        expect(booleanObjectCompare.eq('is')(false)({ is: true })).toEqual(false);
        expect(booleanObjectCompare.not('is')(true)({ is: true })).toEqual(false);
        expect(booleanObjectCompare.not('is')(true)({ is: false })).toEqual(true);
    });
    it('object array', () => {
        expect(arrayObjectCompare.contains('name')('1')([{ name: '1' }, { name: '2' }])).toEqual(true);
        expect(arrayObjectCompare.contains('name')('1')([{ name: '3' }, { name: '2' }])).toEqual(false);
        expect(arrayObjectCompare.contains_every('name')(['1', '2'])([{ name: '1' }, { name: '2' }])).toEqual(true);
        expect(arrayObjectCompare.contains_every('name')(['1', '2'])([{ name: '1' }, { name: '3' }])).toEqual(false);
        expect(arrayObjectCompare.contains_some('name')(['1', '2'])([{ name: '1' }, { name: '3' }])).toEqual(true);
        expect(arrayObjectCompare.contains_some('name')(['1', '2'])([{ name: '4' }, { name: '3' }])).toEqual(false);
    });
});
