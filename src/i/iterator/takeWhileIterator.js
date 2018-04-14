const M = require('../type');
const symbols = require('../symbols');
const takeWhileIterator = function  (collection, predicate, context) {
  return function* (reverse) {
    const interIterator = M[symbols.PROP_ITERATOR](collection, reverse);
    let step;
    let skip = true;
    while (!(step = interIterator.next()).done) {

      let [key, value] = step.value;
      if (!predicate.call(context, value, key, collection)) {
        break;
      }

      yield [key, value];

    }
  };

};

module.exports = takeWhileIterator;
