const toString = (a: any): string => {
  if (typeof a === 'object') {
    return `new String( ${a.valueOf()} )`;
  } else {
    return a;
  }
};

export {
  toString
};
