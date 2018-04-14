import { } from '../Array';
export const filterIterator = function*<A>(fn: (a: A) => boolean, interIterator: Iterator<A>): Iterator<A> {
  let value;
  while (!({ value } = interIterator.next()).done) {
    if (fn(value)) {
      yield value;
    }
  }
};

export const mapIterator = function*<A, B>(fn: (a: A) => B, interIterator: Iterator<A>): Iterator<B> {
  let value;
  while (!({ value } = interIterator.next()).done) {
    yield fn(value);
  }
};

export const numberIterator = function* (n: number, isReserved: boolean) {
  const initValue = isReserved ? n - 1 : 0;
  const stopValue = isReserved ? -1 : n;
  let nextValue = initValue;

  while (nextValue !== stopValue) {
    yield isReserved ? nextValue-- : nextValue++;
  }

};

export const selfIterator = function* <T>(a: T): Iterator<T> {
  yield a;
};
export const skipIterator = function*<A>(predicate: (a: A) => boolean, interIterator: Iterator<A>): Iterator<A> {
  let value;
  let skip = true;
  while (!({ value } = interIterator.next()).done) {

    if (skip) {
      skip = predicate.call(value);
    }

    if (!skip) {

      yield value;
    }
  }
};
export const sliceIterator = function*<A>(begin: number, end: number, interIterator: Iterator<A>): Iterator<A> {
  let value;
  let count = 0;
  while (!({ value } = interIterator.next()).done) {
    if (count >= begin && (end < 0 || count < end)) {
      yield value;
    }

    count++;
  }
};
export const takeWhileIterator = function*<A>(
  predicate: (a: A) => boolean,
  interIterator: Iterator<A>): Iterator<A> {
  let value;
  while (!({ value } = interIterator.next()).done) {
    if (!predicate(value)) {
      break;
    }

    yield value;

  }
};
export const skipWhileIterator = function*<A>(
  predicate: (a: A) => boolean,
  interIterator: Iterator<A>): Iterator<A> {
  let value;
  while (!({ value } = interIterator.next()).done) {
    if (!predicate(value)) {
      continue;
    }

    yield value;

  }
};
export const distinctIterator = function*<A>(
  predicate: (a: A) => boolean,
  interIterator: Iterator<A>): Iterator<A> {
  let value;
  while (!({ value } = interIterator.next()).done) {
    if (!predicate(value)) {
      continue;
    }

    yield value;

  }
};

export const getIterator = <T>(iterable: Iterable<T>) => iterable[Symbol.iterator]();

export const arrayIterator = function* <T>(a: T[], isIndexed: boolean = false, reverse: boolean = false) {
  const interIterator = numberIterator(a.length, reverse);
  let value;
  while (!({ value } = interIterator.next()).done) {
    if (isIndexed) {
      yield [value, a[value]];
    } else {
      yield a[value];
    }
  }
};

export type TIteratorType = 'keys' | 'values' | 'entitys';
export const objectIteratorValues = function*<T>(
  obj: { [name: string]: T },
  type: TIteratorType = 'values',
  isIndexed: boolean = false,
  reverse: boolean = false,
  keys: string[] = Object.keys(obj)): Iterator<T | [number, T] | string |
  [number, string] | [string, T] | [number, [string, T]]> {

  let value;
  const interIterator = numberIterator(keys.length, reverse);
  while (!({ value } = interIterator.next()).done) {
    const key = keys[value];
    if (type === 'keys') {
      if (isIndexed) {
        yield [value, key];
      } else {
        yield key;
      }

    } else if (type === 'values') {
      if (isIndexed) {
        yield [value, obj[key]];
      } else {
        yield obj[key];
      }
    } else {
      if (isIndexed) {
        yield [value, [key, obj[key]]];
      } else {
        yield [key, obj[key]];
      }
    }
  }
};
export const objectIterator = function*<T>(
  obj: { [name: string]: T },
  reverse: boolean = false,
  keys: string[] = Object.keys(obj)): Iterator<[string, T]> {

  let value;
  const interIterator = numberIterator(keys.length, reverse);
  while (!({ value } = interIterator.next()).done) {
    const key = keys[value];
    yield [key, obj[key]];
  }
};

export const setIterator = function*<T>(iterator: Iterator<T>) {

  let i = 0;
  let value;
  while (!({ value } = iterator.next()).done) {
    yield [i++, value];

  }
};
