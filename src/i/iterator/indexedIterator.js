const M = require('../type');
const symbols = require('../symbols');
const indexedIterator =  (collection)=> {
  return function* (reverse, context) {
    const interIterator = M[symbols.PROP_ITERATOR](collection, reverse);

    let step;
    let i = 0;
    while (!(step = interIterator.next()).done) {
      let [key, value] = step.value;

      yield [i++, value];

    }
  };
};

module.exports = indexedIterator;
