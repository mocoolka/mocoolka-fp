import {
    deleteLast, deleteFirst, moveAndFillLeftOrRight, timeSelf,
    moveAndFillLeft, moveAndFillRight, removeduplicate, deleteByIdWhile,modifyByIdWhile,
    sliceFirst, sliceAfter, sliceBefore, sliceLast, sliceSkip,
    min,max,concatMinArray,headArrayOption
} from '../Array';
import {some,none} from '../Option'
const a = [1, 2, 3];
describe('array', () => {
    it('removeduplicate', () => {
        expect(removeduplicate([1, 2, 1, 2, 3])).toEqual([1, 2, 3]);
        expect(removeduplicate([])).toEqual([]);
    });
    it('deleteByIdWhile', () => {
        expect(deleteByIdWhile([1, 2, 3], b => b === 2)).toEqual(some([1, 3]));
    });
    it('modifyByIdWhile', () => {
        expect(modifyByIdWhile([1, 2, 3], b => b === 2,_=>4)).toEqual(some([1,4, 3]));
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
        expect(sliceBefore(b => b === 3)([1, 2, 3, 4])).toEqual(some([1, 2]));
    });
    it('sliceAfter', () => {
        expect(sliceAfter(b => b === 3)([1, 2, 3, 4])).toEqual(some([4]));
    });
    it('min',()=>{
        expect(min([1,2,3])).toEqual(1);
    })
    it('max',()=>{
        expect(max([1,2,3])).toEqual(3);
    })
    it('concatMinArray',()=>{
        expect(concatMinArray([],[])).toEqual([]);
        expect(concatMinArray([1,2,3],[{a:1}])).toEqual([[1,{a:1}]]);
    })  
    it('headArrayOption',()=>{
        expect(headArrayOption([none,some(1)])).toEqual(some(1));
        expect(headArrayOption([none,none])).toEqual(none);
    })

});
