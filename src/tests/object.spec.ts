import {
    moveAndFillRightObject
} from '../object';
describe('array', () => {
    it('moveRightObject', () => {
        expect(moveAndFillRightObject({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 1, c: 2 });
    });
});
