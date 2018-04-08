
import {repeat} from './repeat';
/**
 * Pad string with `char` if its' length is smaller than `minLen`
 */
const lpad = (str: string, minLength: number, mark: string= ' '): string =>
  (str.length < minLength) ?  repeat(mark, minLength - str.length) + str : str;

export {
    lpad
};
