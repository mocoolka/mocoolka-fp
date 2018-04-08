/**
 * Checks if string ends with specified suffix.
 */
const endsWith = (str: string, suffix: string) => {

  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export {
  endsWith
};
