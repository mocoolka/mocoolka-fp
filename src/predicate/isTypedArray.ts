export const isTypedArray = (ar: any) => {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(Object.prototype.toString.call(ar)));
};
