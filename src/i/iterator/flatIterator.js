const M = require('../type');
const symbols = require('../symbols');
const flatIterator =  (collection, depth, isCollection, context)=> {

  const _flat = function * (collection, reverse, depth, currentDepth,    context) {
    const interIterator = M[symbols.PROP_ITERATOR](collection, reverse);
    let step;
    try {
      while (!(step = interIterator.next()).done) {

        let [key, value] = step.value;
        if ((!depth || currentDepth < depth) && isCollection(value)) {
          yield* _flat(value, depth, currentDepth + 1, context);
        } else {
          yield [key, value];
        }
      }
    }
    catch(error){
      console.log(collection)
    }
  };

  return function (reverse) {
    return _flat(collection, reverse, depth, depth, context);
  };
};

module.exports = flatIterator;
