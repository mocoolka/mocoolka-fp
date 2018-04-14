const M = require('../type');
const symbols = require('../symbols');
const skipIterator = function  (collection, predicate, context) {
  return function* (reverse) {
    const interIterator = M[symbols.PROP_ITERATOR](collection, reverse);
    let step;
    let skip = true;
    while (!(step = interIterator.next()).done) {

      let [key, value] = step.value;
      if (skip) {
        skip = predicate.call(context, value, key, collection);
      }

      if (!skip) {

        yield [key, value];
      }

    }
  };

};

module.exports = skipIterator;
