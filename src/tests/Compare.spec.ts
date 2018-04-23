import {
    stringCompare, numberCompare, booleanCompare
} from '../Compare';
import {
    filter
} from '../Array';
const a = [1, 2, 3];
const b = ['1', '2', '3'];
describe('Compare', () => {
    it('string', () => {
        expect(stringCompare.eq('1')('1')).toEqual(true);
        expect(stringCompare.eq('1')('2')).toEqual(false);
        expect(stringCompare.not('1')('1')).toEqual(false);
        expect(stringCompare.not('1')('2')).toEqual(true);
        expect(stringCompare.lt('1')('2')).toEqual(false);
        expect(stringCompare.lt('2')('1')).toEqual(true);
        expect(stringCompare.lt('1')('1')).toEqual(false);
        expect(stringCompare.lte('1')('1')).toEqual(true);
        expect(stringCompare.gt('1')('2')).toEqual(true);
        expect(stringCompare.gt('2')('1')).toEqual(false);
        expect(stringCompare.gt('1')('1')).toEqual(false);
        expect(stringCompare.gte('1')('1')).toEqual(true);
        expect(stringCompare.contains('1')('123')).toEqual(true);
        expect(stringCompare.notContains('1')('123')).toEqual(false);
        expect(stringCompare.in(['1', '2'])('1')).toEqual(true);
        expect(stringCompare.notIn(['1', '2'])('1')).toEqual(false);
        expect(stringCompare.startsWith('1')('123')).toEqual(true);
        expect(stringCompare.notStartsWith('1')('123')).toEqual(false);
        expect(stringCompare.endsWith('3')('123')).toEqual(true);
        expect(stringCompare.notEndsWith('3')('123')).toEqual(false);
        expect(filter(b, stringCompare.eq('1'))).toEqual(['1']);
        expect(filter(b, stringCompare.lt('3'))).toEqual(['1', '2']);
        expect(filter(b, stringCompare.gt('1'))).toEqual(['2', '3']);
    });
    it('number', () => {
        expect(numberCompare.eq(1)(1)).toEqual(true);
        expect(numberCompare.eq(1)(2)).toEqual(false);
        expect(numberCompare.not(1)(1)).toEqual(false);
        expect(numberCompare.not(1)(2)).toEqual(true);
        expect(numberCompare.lt(1)(2)).toEqual(false);
        expect(numberCompare.lt(2)(1)).toEqual(true);
        expect(numberCompare.lt(1)(1)).toEqual(false);
        expect(numberCompare.lte(1)(1)).toEqual(true);
        expect(numberCompare.gt(1)(2)).toEqual(true);
        expect(numberCompare.gt(2)(1)).toEqual(false);
        expect(numberCompare.gt(1)(1)).toEqual(false);
        expect(numberCompare.gte(1)(1)).toEqual(true);
        expect(filter(a, numberCompare.eq(1))).toEqual([1]);
        expect(filter(a, numberCompare.lt(3))).toEqual([1, 2]);
        expect(filter(a, numberCompare.gt(1))).toEqual([2, 3]);
    });
    it('boolean', () => {
        expect(booleanCompare.eq(true)(true)).toEqual(true);
        expect(booleanCompare.eq(false)(true)).toEqual(false);
        expect(booleanCompare.not(true)(true)).toEqual(false);
        expect(booleanCompare.not(true)(false)).toEqual(true);
    });

});
