
export const getTypeName = (value: any) => {
  const typeofObj = typeof value;
  if (typeofObj !== 'object' && typeofObj !== 'function') {
    return typeofObj;
  }

  if (value === null) {
    return 'null';
  }

  if (typeofObj === 'function') {
    return typeofObj;
  }
  return Object.prototype.toString.call(value).slice(8, -1);
};
