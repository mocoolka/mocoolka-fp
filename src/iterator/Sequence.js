import { HKT, URIS, URIS2, Type, Type2, Type3, URIS3 } from '../HKT';
import { Monad1 } from './'
import SequenceIterator, { GeneratorIterator, GeneratorSeedIterator, IterableIterator } from "./SequenceIterator";
import { All } from "./all";
import { Any } from "./any";
import { AsIterable } from "./asIterable";
import { Associate } from "./associate";
import { AssociateBy } from "./associateBy";
import { Average } from "./average";
import { Chunk } from "./chunk";
import { Contains } from "./contains";
import { Count } from "./count";
import { Distinct } from "./distinct";
import { DistinctBy } from "./distinctBy";
import { Drop } from "./drop";
import { DropWhile } from "./dropWhile";
import { ElementAt } from "./elementAt";
import { ElementAtOrElse } from "./elementAtOrElse";
import { ElementAtOrNull } from "./elementAtOrNull";
import { Filter } from "./filter";
import { FilterIndexed } from "./filterIndexed";
import { FilterNot } from "./filterNot";
import { FilterNotNull } from "./filterNotNull";
import { First } from "./first";
import { FirstOrNull } from "./firstOrNull";
import { FlatMap } from "./flatMap";
import { Flatten } from "./flatten";
import { Fold } from "./fold";
import { FoldIndexed } from "./foldIndexed";
import { ForEach } from "./forEach";
import { ForEachIndexed } from "./forEachIndexed";
import { GroupBy } from "./groupBy";
import { IndexOf } from "./indexOf";
import { IndexOfFirst } from "./indexOfFirst";
import { IndexOfLast } from "./indexOfLast";
import { JoinToString } from "./joinToString";
import { Last } from "./last";
import { LastOrNull } from "./lastOrNull";
import { MapIterator } from "./map";
import { MapIndexed } from "./mapIndexed";
import { MapNotNull } from "./mapNotNull";
import { Max } from "./max";
import { MaxBy } from "./maxBy";
import { MaxWith } from "./maxWith";
import { Merge } from "./merge";
import { Min } from "./min";
import { MinBy } from "./minBy";
import { Minus } from "./minus";
import { MinWith } from "./minWith";
import { None } from "./none";
import { OnEach } from "./onEach";
import { Partition } from "./partition";
import { Plus } from "./plus";
import { Reduce } from "./reduce";
import { ReduceIndexed } from "./reduceIndexed";
import { Reverse } from "./reverse";
import { Single } from "./single";
import { SingleOrNull } from "./singleOrNull";
import { Sorted } from "./sorted";
import { SortedBy } from "./sortedBy";
import { SortedByDescending } from "./sortedByDescending";
import { SortedDescending } from "./sortedDescending";
import { SortedWith } from "./sortedWith";
import { Sum } from "./sum";
import { SumBy } from "./sumBy";
import { Take } from "./take";
import { TakeWhile } from "./takeWhile";
import { ToArray } from "./toArray";
import { ToMap } from "./toMap";
import { ToSet } from "./toSet";
import { Unzip } from "./unzip";
import { WithIndex } from "./withIndex";
import { Zip } from "./zip";

/**
 * @hidden
 */
export interface SequenceOperators<T> extends All, Any, AsIterable, Associate, AssociateBy<T>, Average, Chunk, Contains, Count, Distinct, DistinctBy, Drop,
    DropWhile, ElementAt, ElementAtOrElse, ElementAtOrNull, Filter, FilterIndexed, FilterNot, FilterNotNull, First, FirstOrNull, FlatMap, Flatten, Fold, FoldIndexed,
    ForEach, ForEachIndexed, GroupBy, IndexOf, IndexOfFirst, IndexOfLast, JoinToString, Last, LastOrNull, Map, MapIndexed, MapNotNull, Max, MaxBy, MaxWith, Merge, Min, MinBy,
    Minus, MinWith, None, OnEach, Partition, Plus, Reduce, ReduceIndexed, Reverse, Single, SingleOrNull, Sorted, SortedBy, SortedByDescending, SortedDescending, SortedWith,
    Sum, SumBy, Take, TakeWhile, ToArray, ToMap, ToSet, Unzip, WithIndex, Zip {
}

/**
 * A Sequence provides a fluent functional API consisting
 * of various intermediate and terminal operations for processing the iterated data.
 * The operations are evaluated lazily to avoid examining all of the input data
 * when it's not necessary. Sequences can be iterated only once.
 */
export default interface ISequence<T> extends SequenceOperators<T> {
    readonly iterator: SequenceIterator<T>;
}
declare module '../HKT' {
    interface URI2HKT<A> {
        Sequence: Sequence<A>;
    }
}

export const URI = 'Sequence';

export type URI = typeof URI;
export class Sequence<A> {
    // prettier-ignore
    readonly '_A': A;
    // prettier-ignore
    readonly '_URI': URI;
    constructor(readonly iterator: SequenceIterator<A>) {
    }
    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     *
     * @param {(T) => S} transform
     * @returns {ISequence<S>}
     */
    map<S>(transform: (element: A) => S): Sequence<S> {
        return of(new MapIterator(transform, this.iterator));
    }
/*     ap<B>(fab: SequenceIterator<(a: A) => B>): SequenceIterator<B> {
        return new SequenceIterator(() => Promise.all([fab.run(), this.run()]).then(([f, a]) => f(a)))
      }
    chain<B>(f: (a: A) => Task<B>): Task<B> {
        return new Task(() => this.run().then(a => f(a).run()))
      } */
}

applyMixins(Sequence, [All, Any, AsIterable, Associate, AssociateBy, Average, Chunk, Contains, Count, Distinct, DistinctBy, Drop,
    DropWhile, ElementAt, ElementAtOrElse, ElementAtOrNull, Filter, FilterIndexed, FilterNot, FilterNotNull, First, FirstOrNull, FlatMap, Flatten, Fold, FoldIndexed,
    ForEach, ForEachIndexed, GroupBy, IndexOf, IndexOfFirst, IndexOfLast, JoinToString, Last, LastOrNull, Map, MapIndexed, MapNotNull, Max, MaxBy, MaxWith, Merge, Min, MinBy,
    Minus, MinWith, None, OnEach, Partition, Plus, Reduce, ReduceIndexed, Reverse, Single, SingleOrNull, Sorted, SortedBy, SortedByDescending, SortedDescending, SortedWith,
    Sum, SumBy, Take, TakeWhile, ToArray, ToMap, ToSet, Unzip, WithIndex, Zip]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}



export function emptySequence<T>(): ISequence<T> {
    return asSequence([]);
}

export function asSequence<T>(iterable: Iterable<T>): ISequence<T> {
    if (iterable === null) {
        throw new Error("Cannot create sequence for input: null");
    }
    if (iterable === undefined) {
        throw new Error("Cannot create sequence for input: undefined");
    }
    if (iterable[Symbol.iterator] == null) {
        throw new Error("Cannot create sequence for non-iterable input: " + iterable);
    }
    return of<T>(new IterableIterator(iterable));
}

export const of = <T>(iterator: SequenceIterator<T>): Sequence<T> => {
    return new Sequence(iterator);
}
export function isSequence<T>(object: any): object is Sequence<T> {
    return object instanceof Sequence;
}

export function extendSequence(mixin: { new(): any }) {
    applyMixins(Sequence, [mixin]);
}
export function generateSequence<T>(nextFunction: () => T | null | undefined): ISequence<T>;
export function generateSequence<T>(seedFunction: () => T | null | undefined, nextFunction: (item: T) => T | null | undefined): ISequence<T>;
export function generateSequence<T>(seed: T | null | undefined, nextFunction: (item: T) => T | null | undefined): ISequence<T>;
export function generateSequence<T>(a: any, b?: any): ISequence<T> {
    if (typeof a === "function" && b == null) {
        return of<T>(new GeneratorIterator(a));
    }
    const seed = typeof a === "function" ? a() : a;
    return seed != null
        ? of<T>(new GeneratorSeedIterator(seed, b))
        : emptySequence<T>();
}

export function range(start: number, endInclusive: number, step: number = 1): ISequence<number> {
    if (start > endInclusive) {
        throw new Error(`start [${start}] must be lower then endInclusive [${endInclusive}]`);
    }
    if (start === endInclusive) {
        return emptySequence();
    }
    let current = start;
    return generateSequence(() => {
        try {
            return current <= endInclusive
                ? current
                : undefined;
        } finally {
            current += step;
        }
    });
}
export const map = <A, B>(fa: Sequence<A>, f: (a: A) => B): Sequence<B> => fa.map(f);
export function sequenceOf<T>(...args: Array<T>): ISequence<T> {
    return asSequence(args);
}


/* const ap = <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => {
    return fa.ap(fab)
}

const chain = <A, B>(fa: Task<A>, f: (a: A) => Task<B>): Task<B> => {
    return fa.chain(f)
}

export const task: Monad1<URI> = {
    URI,
    map,
    of,
    ap,
    chain
} */