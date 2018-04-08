import {replaceAccents} from './replaceAccents';
import {removeNonWord} from './removeNonWord';
import {upperCase} from './upperCase';
import {lowerCase} from './lowerCase';
/**
 * Convert string to camelCase text.
 * @since v0.1.0
 * @category String
 * @param {string} str
 * @return {string}
 */
const camelCase = (str: string): string => {
  str = replaceAccents(str);
  str = removeNonWord(str)
    .replace(/[\-_]/g, ' ') // convert all hyphens and underscores to spaces
    .replace(/\s[a-z]/g, upperCase) // convert first char of each word to UPPERCASE
    .replace(/\s+/g, '') // remove spaces
    .replace(/^[A-Z]/g, lowerCase); // convert first char to lowercase
  return str;
};

export {
    camelCase
};
