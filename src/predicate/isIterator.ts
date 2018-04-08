export const isIterator = (a: any) => {
  return a && typeof a.next === 'function';
};
