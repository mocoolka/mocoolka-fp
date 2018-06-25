import {
    getCompareFunction
} from '../TypeCompare';
import { isFunction } from '../predicate';
describe('Compare', () => {
    it('string', () => {
        expect(getCompareFunction('string', 'eq')('1')('1')).toEqual(true);
        expect(getCompareFunction('string', 'eq')('1')('2')).toEqual(false);
    });
    it('number', () => {
        expect(getCompareFunction('number', 'eq')(1)(1)).toEqual(true);
        expect(getCompareFunction('number', 'eq')(1)(2)).toEqual(false);
    });
    it('boolean', () => {
        expect(getCompareFunction('boolean', 'eq')(true)(true)).toEqual(true);
        expect(getCompareFunction('boolean', 'eq')(false)(true)).toEqual(false);
    });
/*     it('array', () => {
        expect(compareArrayParams.string.contains('1')(['1', '2'])).toEqual(true);
    }); */
    it('getCompareFunction', () => {
        expect(isFunction(getCompareFunction('string', 'eq'))).toEqual(true);
        try {
            getCompareFunction('string1', 'eq');
        } catch (e) {
            expect(e.toString()).toEqual(`Error: type 'string1' not be found.`);
        }
        try {
            getCompareFunction('string', 'eq1');
        } catch (e) {
            expect(e.toString()).toEqual(`Error: Name 'eq1' not be found in compare type 'string'.`);
        }
    });
});
