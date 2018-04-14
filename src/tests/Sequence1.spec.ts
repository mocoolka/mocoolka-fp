import {
    toSortedArray, map, getSetoid, member, every, some, subset, filter,
    forEach, max, min, count, reduce, first, last, reverse, toArray, seq,
    sort, groupBy, get, has,
} from '../Cols';
import { boundedNumber } from '../Bounded';
import { setoidNumber } from '../Setoid';
import { ordNumber } from '../Ord';
const seqAO = seq<{ a: string; b: number }>([{ a: 'a', b: 1 }, { a: 'a', b: 2 }, { a: '3', b: 3 }]);
const seqO = seq<string>({ a: 'a', b: 'b', c: 'c' });
const seq1 = seq<any>({ a: { b: { c: 1 } }, b: 'b', c: 'c' });
describe('predicate', () => {
    it('seq', () => {
        expect(toArray(seq([1, 2]))).toEqual([1, 2]);
        expect(toArray(seq({ a: 1, b: 2 }))).toEqual([1, 2]);
        expect(toArray(seq(new Set([1, 2])))).toEqual([1, 2]);
    });
    it('foreach', () => {
        let result: any[] = [];
        seq<number>([1, 2]).forEach((v) => {
            result.push(v);
        });
        expect(result).toEqual([1, 2]);
        result = [];
        forEach(seq<number>([1, 2]), (v) => {
            result.push(v);
            return v === 1;
        });
        expect(result).toEqual([1]);
    });
    it('map', () => {
        const d1 = seq<number>([1, 2]);
        const double = (n: number): number => n * 2;
        expect(toArray(d1.map(double))).toEqual([2, 4]);
        expect(toArray(seq<number>([1, 2]).map(double))).toEqual([2, 4]);
        expect(toArray(map(seq<number>([1, 2]), double))).toEqual([2, 4]);
        // expect(getSetoid(setoidNumber).equals(d2, fromIterable([2, 4]))).toEqual(true);
    });
    it('filter', () => {
        const d1 = seq<number>([1, 2]);
        expect(getSetoid(setoidNumber).equals(d1.filter(a => a === 1), seq([1]))).toEqual(true);
        expect(toArray(filter(seq<number>([1, 2]), (a => a === 1)))).toEqual([1]);
    });
    it('equals', () => {
        const d1 = seq<number>([1, 2]);
        const double = (n: number): number => n * 2;
        expect(getSetoid(setoidNumber).equals(d1.map(double), seq([2, 4]))).toEqual(true);
    });

    it('member', () => {
        const d1 = member(setoidNumber)(seq<number>([1, 2]));
        expect(d1(1)).toEqual(true);
        expect(d1(3)).toEqual(false);
    });
    it('toArray', () => {
        expect(toArray(seq<number>([1, 2]))).toEqual([1, 2]);
    });
    it('toSortedArray', () => {
        expect(toSortedArray(ordNumber)(seq<number>([1, 2]))).toEqual([1, 2]);
    });
    it('every', () => {
        expect(every(seq<number>([1, 2]), a => a > 1)).toEqual(false);
        expect(every(seq<number>([1, 2]), a => a > 0)).toEqual(true);
    });
    it('some', () => {
        expect(some(seq<number>([1, 2]), a => a > 1)).toEqual(true);
        expect(some(seq<number>([1, 2]), a => a > 2)).toEqual(false);
    });
    it('subset', () => {
        expect(subset(setoidNumber)(seq<number>([1, 2]), seq<number>([1, 2, 3]))).toEqual(true);
    });
    it('subset', () => {
        expect(subset(setoidNumber)(seq<number>([1, 2]), seq<number>([1, 2, 3]))).toEqual(true);
    });
    it('max', () => {
        const result = max(boundedNumber)(seq<number>([1, 2]));
        expect(result).toEqual(2);
    });
    it('min', () => {
        const result = min(boundedNumber)(seq<number>([1, 2]));
        expect(result).toEqual(1);
    });
    it('count', () => {
        const result = count(seq<number>([1, 2]));
        expect(result).toEqual(2);
    });
    it('reduce', () => {
        const result = reduce(seq<number>([1, 2]), 0, (acc, value) => acc + value);
        expect(result).toEqual(3);
        const result1 = reduce(seq<number>([1, 2]), '0', (acc, value) => acc + value.toString());
        expect(result1).toEqual('012');
    });
    it('first', () => {
        const result = first(seq<number>([1, 2])).getOrElse(-1);
        expect(result).toEqual(1);
        expect(seq<number>([1, 2]).first().getOrElse(-1)).toEqual(1);
        expect(seq<number>([]).first().getOrElse(-1)).toEqual(-1);
    });
    it('last', () => {
        const result = last(seq<number>([1, 2])).getOrElse(-1);
        expect(seq<number>([1, 2]).last().getOrElse(-1)).toEqual(2);
        expect(seq<number>([]).last().getOrElse(-1)).toEqual(-1);
        expect(result).toEqual(2);
    });
    it('reverse', () => {
        const result = toArray(reverse(seq<number>([1, 2])));
        expect(result).toEqual([2, 1]);
    });
    it('sort', () => {
        const result = toArray(sort(ordNumber)(seq<number>([3, 1, 2])));
        expect(result).toEqual([1, 2, 3]);
        expect(toArray(seq<number>([3, 1, 2]).sort(ordNumber))).toEqual([1, 2, 3]);
    });
    it('groupBy', () => {
        const values = [{ a: 'a', b: 1 }, { a: 'a', b: 2 }, { a: '3', b: 3 }];
        const result = groupBy(seq<{ a: string; b: number }>(values), (_v => _v.a));
        const v = new Map();
        v.set('a', [{ a: 'a', b: 1 }, { a: 'a', b: 2 }]);
        v.set('3', [{ a: '3', b: 3 }]);
        expect(result).toEqual(v);
    });
    it('get', () => {
        expect(get(seqAO, 'a').getOrElse({ a: '0', b: 0 })).toEqual({ a: '0', b: 0 });
        expect(get(seqAO, 0).getOrElse({ a: '0', b: 0 })).toEqual({ a: 'a', b: 1 });
        expect(get(seqAO, -1).getOrElse({ a: '0', b: 0 })).toEqual({ a: '3', b: 3 });
        expect(get(seqO, 0).getOrElse('-1')).toEqual('-1');
        expect(get(seqO, 'a').getOrElse('-1')).toEqual('a');
        expect(get(seqO, '3').getOrElse('-1')).toEqual('-1');

        expect(get(seq1, ['a', 'b', 'c']).getOrElse({ a: '0', b: 0 })).toEqual(1);
        expect(get(seq1, ['a', 'b', 'c', 'd']).getOrElse(-1)).toEqual(-1);
    });
    it('has', () => {
        expect(has(seqAO, 'a')).toEqual(false);
        expect(has(seqAO, 8)).toEqual(false);
        expect(has(seqAO, 0)).toEqual(true);
        expect(has(seqO, 0)).toEqual(false);
        expect(has(seqO, '7')).toEqual(false);
        expect(has(seqO, 'a')).toEqual(true);
        expect(has(seq1, ['a', 'b', 'c'])).toEqual(true);
        expect(has(seq1, ['a', 'b', 'c', 'd'])).toEqual(false);
    });
    it('slice', () => {
        expect(toArray(seq(['a', 'b', 'c', 'd']).slice(0, 1))).toEqual(['a']);
        expect(toArray(seq(['a', 'b', 'c', 'd']).slice(0, 10))).toEqual(['a', 'b', 'c', 'd']);
        expect(toArray(seq(['a', 'b', 'c', 'd']).slice(0, -3))).toEqual(['a', 'b', 'c', 'd']);
        expect(toArray(seq(['a', 'b', 'c', 'd']).slice(-1, -3))).toEqual(['a', 'b', 'c', 'd']);
        expect(toArray(seq(['a', 'b', 'c', 'd']).slice(-1, 2))).toEqual(['a', 'b']);
    });
});
