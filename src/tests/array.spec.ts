import {
    deleteLast, deleteFirst, moveAndFillLeftOrRight, timeSelf,
    moveAndFillLeft, moveAndFillRight, removeduplicate, remove,
    sliceFirst, sliceAfter, sliceBefore, sliceLast, sliceSkip
} from '../Array';
const a = [1, 2, 3];
describe('array', () => {
    it('removeduplicate', () => {
        expect(removeduplicate([1, 2, 1, 2, 3])).toEqual([1, 2, 3]);
        expect(removeduplicate([])).toEqual([]);
    });
    it('remove', () => {
        expect(remove([1, 2, 3], b => b === 2)).toEqual([1, 3]);
    });
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
    it('sliceFirst', () => {
        expect(sliceFirst(2)([1, 2, 3, 4])).toEqual([1, 2]);
    });
    it('sliceLast', () => {
        expect(sliceLast(2)([1, 2, 3, 4])).toEqual([3, 4]);
    });
    it('sliceSkip', () => {
        expect(sliceSkip(2)([1, 2, 3, 4])).toEqual([3, 4]);
    });
    it('sliceBefore', () => {
        expect(sliceBefore(b => b === 3)([1, 2, 3, 4])).toEqual([1, 2]);
    });
    it('sliceAfter', () => {
        expect(sliceAfter(b => b === 3)([1, 2, 3, 4])).toEqual([4]);
    });

});
