const M = require('../type');
const symbols = require('../symbols');
const sliceIterator = function  (collection, reverse, begin, end, context) {
    return function* () {
      const interIterator = M[symbols.PROP_ITERATOR](collection, reverse);
      let step;
      let count = 0;
      while (!(step = interIterator.next()).done) {
        if (count >= begin && count < end) {
          let [key, value] = step.value;

          yield [key, value];
        }

        count++;
      }
    };

  };

module.exports = sliceIterator;
