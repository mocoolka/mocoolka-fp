/**
 * Converts a value to a string, adding quotes if a string was provided.
 */
const quoteString = (value: string): string => {
  return typeof value === 'string' ? JSON.stringify(value) : String(value);
};

export {
  quoteString
};
