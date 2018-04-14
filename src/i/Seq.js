import { fold, getMeetSemigroup, getJoinSemigroup } from '../Semigroup';
import { mapIterator, filterIterator, arrayIterator, objectIteratorValues, getIterator } from './iterator';
import { array } from '../Array';
import { Ord } from '../Ord';
import { Setoid } from '../Setoid';
import * as option from '../Option';
import { isUndefined, isArray, isIterable, isIterator,
     isArrayLike, TPlainObject, isPlainObject } from '../predicate';
import { wrapIndex } from './utils';
import { Predicate, not } from '../function';
export const URI = 'Sequence';

export type URI = typeof URI;
type SeqInputType<T> =
    T[] | Iterable<T> | Iterator<T>;
export class Sequence<A> {
    readonly '_A': A;
    readonly '_URI': URI;
    protected cache?: any[];
    protected entrySeq: any;
    constructor(
        readonly iterator: Iterator<A>,
        readonly reverseIterator?: Iterator<A>,
        protected size: number = -1) {

    }
    static of = <A>(iterator: Iterator<A>, reverseIterator?: Iterator<A>, size?: number) =>
        new Sequence<A>(iterator, reverseIterator, size)

    cacheResult() {
        if (isUndefined(this.cache) && this.iterator) {
            this.cache = this.entrySeq().toArray();
            this.size = this.cache.length;
        }
        return this;
    }
    public count = () => {
        if (this.size === -1) {
            let c = 0;
            this.forEach(a => { c++; });
            this.size = c;
        }
        return this.size;
    }
    public forEach = (f: (v: A) => boolean | undefined | null | void) => {
        let value;
        let found = false;
        while (!({ value } = this.iterator.next()).done) {
            if (f(value)) {
                found = true;
                break;
            }
        }
        return found;
    }
    public reverse = () => {
        return Sequence.of(this.reverseIterator, this.iterator, this.size);
    }
    public map = <B>(f: (a: A) => B): Sequence<B> => {
        return Sequence.of(mapIterator(f, this.iterator), mapIterator(f, this.reverseIterator), this.size);
    }

    public filter = (predicate: Predicate<A>): Sequence<A> => {
        return Sequence.of(filterIterator(predicate, this.iterator),
            filterIterator(predicate, this.reverseIterator), this.size);
    }

}

export abstract class KeyedSeq<A> extends Sequence<A> {

    toKeyedSeq() {
        return this;
    }

}
export abstract class IndexedSeq<A> extends Sequence<A> {

    toIndexedSeq() {
        return this;
    }

}

export class ArraySeq<A> extends IndexedSeq<A> {
    constructor(readonly value: A[]) {
        super(arrayIterator(value), arrayIterator(value, true), value.length);
    }

    get(index: number) {
        const i = index < 0 ? this.size + index : index;
        return this.has(index) ? option.some(this.value[i]) : option.none;
    }
    has(index: number) {
        return index < this.size && index > -this.size;
    }

}

class ObjectSeq<T> extends KeyedSeq<T> {
    constructor(readonly value: TPlainObject<T>, readonly keys: string[] = Object.keys(value)) {
        super(objectIteratorValues(value, false, keys), objectIteratorValues(value, true, keys), keys.length);
    }

    get(key: string) {
        if (!this.has(key)) {
            return option.none;
        }
        return option.some(this.value[key]);
    }

    has(key: string) {
        return this.keys.includes(key);
    }

}

class IteratorSeq<A> extends IndexedSeq<A> {

    constructor(readonly inputIterator: Iterator<A>) {
        super(inputIterator);
    }

}
class CollectionSeq<A> extends IndexedSeq<A> {
    constructor(readonly iterable: Iterable<A>) {
        super(getIterator(iterable));
    }
}



/* export const keyedSeqFromValue = <T>(value: SeqInputType<T> | IStrMap<T>) => {
    if (isObject(value)) {
        return new ObjectSeq<T>(value);
    }
    const seq = maybeIndexedSeqFromValue(value);
    if (seq) {
        return seq.fromEntrySeq();
    }
};

export const indexedSeqFromValue = <T>(value: SeqInputType<T>) => {
    const seq = maybeIndexedSeqFromValue(value);
    if (seq) {
        return seq;
    }
    throw new TypeError(
        'Expected Array or collection object of values: ' + value
    );
}; */

/* const seqFromValue = <T>(value: SeqInputType<T> | TPlainObject<T>) => {
    if (isPlainObject(value)) {
        return new ObjectSeq(value);
    }
    const seq = maybeIndexedSeqFromValue(value);
    if (seq) {
        return seq;
    }
    throw new TypeError(
        'Expected Array or collection object of values, or keyed object: ' + value
    );
}; */

const seq = <T>(value: SeqInputType<T>| TPlainObject<T>) => {
    return isArray(value)
        ? new ArraySeq(value)
        : isIterator(value)
            ? new IteratorSeq(value)
            : isIterable(value) ? new CollectionSeq(value) : new ObjectSeq(value);
};
