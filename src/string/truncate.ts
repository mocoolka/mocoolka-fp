import {trim} from './trim';
/**
 * Limit number of chars.
 */
const truncate = (str: string, maxChars: number, append: string= '...', onlyFullWords: boolean= true): string => {

  maxChars = onlyFullWords ? maxChars + 1 : maxChars;

  str = trim(str);
  if (str.length <= maxChars) {
    return str;
  }

  str = str.substr(0, maxChars - append.length);
  // crop at last space or remove trailing whitespace
  str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : trim(str);
  return str + append;
};

export {
  truncate
};
