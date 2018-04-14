const setIterator =  (collection)=> {
  return function* (reverse, context) {
    const interIterator = collection.iterator(reverse);
    let step;

    while (!(step = interIterator.next()).done) {
      let [key, value] = step.value;

      yield [value, value];

    }
  };
};

module.exports = setIterator;
