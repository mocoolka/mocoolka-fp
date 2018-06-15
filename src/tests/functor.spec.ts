import { lift, getFunctorComposition, flap, voidRight, voidLeft } from '../Functor';
import { array } from '../Array';
import { StrMap, strmap } from '../StrMap';
import { option, some } from '../Option';

// const { lift, getFunctorComposition, flap, voidRight, voidLeft } = functor;
describe('Functor', () => {
    it('lift', () => {
        const double = (a: number) => a * 2;
        const f = lift(array)(double);
        const actual = f([1, 2, 3, 4]);
        expect(actual).toEqual([2, 4, 6, 8]);
        const f1 = lift(strmap)(double);
        expect(f1(new StrMap({ a: 1, b: 2, c: 3 })).value).toEqual({ a: 2, b: 4, c: 6 });
    });
    it('getFunctorComposition', () => {
        const arrayOption = getFunctorComposition(array, strmap);
        const double = (a: number) => a * 2;
        expect(arrayOption.map([new StrMap({ a: 1, b: 2 }), new StrMap({ a: -1, b: -2 })], double))
            .toEqual([new StrMap({ a: 2, b: 4 }), new StrMap({ a: -2, b: -4 })]);
    });
    it('getFunctorComposition 1', () => {
        const arrayOption = getFunctorComposition(strmap, array);
        const double = (a: number) => a * 2;
        expect(arrayOption.map(new StrMap({ a: [1], b: [2] }), double)).toEqual(new StrMap({ a: [2], b: [4] }));
    });
    it('getFunctorComposition 2', () => {
        const arrayOption = getFunctorComposition(array, array);
        const double = (a: number) => a * 2;
        expect(arrayOption.map([[1], [2], [3]], double)).toEqual([[2], [4], [6]]);
    });
    it('flap', () => {
        const gt3 = (n: number) => n >= 3;
        const lt5 = (n: number) => n <= 5;
        const fs = [gt3, lt5];
        expect(flap(array)(4, fs)).toEqual([true, true]);
    });
    it('voidRight', () => {
        expect(voidRight(option)(1, some('a'))).toEqual(some(1));
    });

    it('voidLeft', () => {
        expect(voidLeft(array)([1, 2, 3], 1)).toEqual([1, 1, 1]);
        expect(voidLeft(option)(some(1), 'a')).toEqual(some('a'));
    });
});
