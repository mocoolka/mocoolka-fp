const REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@__mocoolka-iterator__@@';
const getIterator = (iterable: any) => {
  const iteratorFn = iterable &&
    ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
};
export const isIterable = (a: any) => {
  return a && typeof getIterator(a) === 'function';
};
