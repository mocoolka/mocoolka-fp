const symbols = require('./symbols');
const getIterator = (iterable)=> {
  const iteratorFn = iterable &&
    ((symbols.REAL_ITERATOR_SYMBOL && iterable[symbols.REAL_ITERATOR_SYMBOL]) ||
    iterable[symbols.FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
};

module.exports = getIterator;
