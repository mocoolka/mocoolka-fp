import {
    deleteLast, deleteFirst, moveAndFillLeftOrRight, timeSelf,
    moveAndFillLeft, moveAndFillRight
} from '../Array';
const a = [1, 2, 3];
describe('array', () => {
    it('deleteLast', () => {
        expect(deleteLast(a)).toEqual([1, 2]);
        expect(deleteLast([])).toEqual([]);
    });
    it('deleteFirst', () => {
        expect(deleteFirst(a)).toEqual([2, 3]);
        expect(deleteLast([])).toEqual([]);
    });
    it('moveAndFillLeft', () => {
        expect(moveAndFillLeft(a)).toEqual([2, 3, 3]);
        expect(moveAndFillLeft([])).toEqual([]);
    });
    it('moveAndFillRight', () => {
        expect(moveAndFillRight(a)).toEqual([1, 1, 2]);
        expect(moveAndFillRight([])).toEqual([]);
    });
    it('moveAndFill', () => {
        expect(moveAndFillLeftOrRight(-1)(a)).toEqual([2, 3, 3]);
        expect(moveAndFillLeftOrRight(1)(a)).toEqual([1, 1, 2]);
    });
    it('timeSelf', () => {
        expect(timeSelf(2)([1, 2, 3, 4])(moveAndFillRight)).toEqual([1, 1, 1, 2]);
        expect(timeSelf(3)([1, 2, 3, 4, 5])(moveAndFillRight)).toEqual([1, 1, 1, 1, 2]);
        expect(timeSelf(3)([1, 2, 3, 4, 5])(moveAndFillLeft)).toEqual([4, 5, 5, 5, 5]);
    });
});