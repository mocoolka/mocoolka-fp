const getIteratorFn = require('./getIterator');
const has = (a)=> {
  return !!getIteratorFn(a);
};

module.exports = has;
