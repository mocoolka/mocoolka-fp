const getIteratorFn = require('./getIterator');
const get = (iterable)=> {
  const iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
};

module.exports = get;
