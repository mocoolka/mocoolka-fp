import {
    ordString,
    ordNumber,
    getOrdMonoid,
    contramap,
} from '../Ord';
import {
    fold
} from '../Monoid';
import { sort } from '../Array';
describe('Setoid', () => {
    it('ordString', () => {
        expect(ordString.equals('a', 'a')).toEqual(true);
        expect(ordString.equals('a', 'b')).toEqual(false);
        expect(ordString.compare('a', 'b')).toEqual(-1);
        expect(ordString.compare('b', 'a')).toEqual(1);
        expect(ordString.compare('a', 'a')).toEqual(0);
    });
    it('getOrdMonoid', () => {
        type T = [number, string];
        const tuples: Array<T> = [[2, 'c'], [1, 'b'], [2, 'a'], [1, 'c']];
        const S = getOrdMonoid<T>();

        const sortByFst = contramap((x: T) => x[0], ordNumber);
        const sortBySnd = contramap((x: T) => x[1], ordString);
        const O1 = fold(S)([sortByFst, sortBySnd]);

        expect(sort(O1)(tuples)).toEqual([[1, 'b'], [1, 'c'], [2, 'a'], [2, 'c']]);
        const O2 = fold(S)([sortBySnd, sortByFst]);
        expect(sort(O2)(tuples)).toEqual([[2, 'a'], [1, 'b'], [1, 'c'], [2, 'c']]);
        const O3 = fold(S)([]);
        expect(sort(O3)(tuples)).toEqual(tuples);
    });
});
