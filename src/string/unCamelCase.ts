
const CAMEL_CASE_BORDER = /([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g;

/**
 * Add space between camelCase text.
 */
export const unCamelCase = (str: string, delimiter: string = ' '): string => {

  function join(_: any, c1: string, c2: string) {
    return c1 + delimiter + c2;
  }

  return str.replace(CAMEL_CASE_BORDER, join).toLowerCase();

};
