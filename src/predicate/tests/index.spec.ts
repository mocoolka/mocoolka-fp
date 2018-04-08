import * as predicate from '../';
describe('predicate', () => {
    const o: any = {};
    const n: any = 1.1;
    const empty: any = null;
    const s: any = '1';
    const d: any = new Date();
    const i: any = 1;
    const u: any = undefined;
    const a: any = [1];
    const b: any = false;
    const f: any = () => 1;
    it('getTypeName', () => {
        expect(predicate.getTypeName(o)).toEqual('Object');
    });
    it('isArray', () => {
        expect(predicate.isArray(a)).toEqual(true);
        expect(predicate.isArray(o)).toEqual(false);
    });
    it('isArrayLike', () => {
        expect(predicate.isArrayLike(a)).toEqual(true);
        expect(predicate.isArrayLike({ length: 8 })).toEqual(true);
        expect(predicate.isArrayLike(o)).toEqual(false);
    });
    it('isBoolean', () => {
        expect(predicate.isBoolean(b)).toEqual(true);
        expect(predicate.isBoolean(o)).toEqual(false);
    });
    it('isDate', () => {
        expect(predicate.isDate(d)).toEqual(true);
        expect(predicate.isDate(o)).toEqual(false);
    });
    it('isEmpty', () => {
        expect(predicate.isEmpty(null)).toEqual(true);
        expect(predicate.isEmpty('')).toEqual(true);
        expect(predicate.isEmpty(o)).toEqual(true);
        expect(predicate.isEmpty([])).toEqual(true);
        expect(predicate.isEmpty(a)).toEqual(false);
        expect(predicate.isEmpty({ a: 1 })).toEqual(false);
    });
    it('isFinite', () => {
        expect(predicate.isFinite(Number.MAX_VALUE.toString())).toEqual(true);
        expect(predicate.isFinite(Number.MAX_VALUE)).toEqual(true);
        expect(predicate.isFinite(Number.MIN_VALUE)).toEqual(true);
    });
    it('isFunction', () => {
        expect(predicate.isFunction(f)).toEqual(true);
        expect(predicate.isFunction(a)).toEqual(false);
    });
    it('isInteger', () => {
        expect(predicate.isInteger(i)).toEqual(true);
        expect(predicate.isInteger(a)).toEqual(false);
    });
    it('isIterable', () => {
        expect(predicate.isIterable(a)).toEqual(true);
        expect(predicate.isIterable(o)).toEqual(false);
    });
    it('isIterator', () => {
        expect(predicate.isIterator({ next: () => void 0 })).toEqual(true);
        expect(predicate.isIterator(o)).toEqual(false);
    });
    it('isNaN', () => {
        expect(predicate.isNaN(s)).toEqual(true);
        expect(predicate.isNaN(i)).toEqual(false);
    });
    it('isNumber', () => {
        expect(predicate.isNumber(n)).toEqual(true);
        expect(predicate.isNumber(a)).toEqual(false);
    });
    it('isNull', () => {
        expect(predicate.isNull(empty)).toEqual(true);
        expect(predicate.isNull(a)).toEqual(false);
    });
    it('isObject', () => {
        expect(predicate.isObject(o)).toEqual(true);
        expect(predicate.isObject(d)).toEqual(false);
        expect(predicate.isObject(d)).toEqual(false);
    });
    it('isPlainObject', () => {
        expect(predicate.isPlainObject(o)).toEqual(true);
        expect(predicate.isObject(d)).toEqual(false);
        expect(predicate.isPlainObject(d)).toEqual(false);
    });
    it('isSameType', () => {
        expect(predicate.isSameType(s, '3')).toEqual(true);
        expect(predicate.isSameType(o, { b: 2 })).toEqual(true);
        expect(predicate.isSameType(a, { b: 2 })).toEqual(false);
        expect(predicate.isSameType(i, s)).toEqual(false);
    });
    it('isString', () => {
        expect(predicate.isString(s)).toEqual(true);
        expect(predicate.isString(a)).toEqual(false);
    });
    it('isUndefined', () => {
        expect(predicate.isUndefined(u)).toEqual(true);
        expect(predicate.isUndefined(a)).toEqual(false);
    });
    it('propExist', () => {
        expect(predicate.propExist({ a: 0 }, 'a')).toEqual(true);
        expect(predicate.propExist({ a: 0 }, 'b')).toEqual(false);
    });
    it('isPositiveNumberOrZero', () => {
        expect(predicate.isPositiveNumberOrZero(0)).toEqual(true);
        expect(predicate.isPositiveNumberOrZero(1)).toEqual(true);
        expect(predicate.isPositiveNumberOrZero(-1)).toEqual(false);
        expect(predicate.isPositiveNumberOrZero(s)).toEqual(false);
    });
    
});
