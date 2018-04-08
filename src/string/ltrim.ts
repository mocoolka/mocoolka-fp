import { WHITE_SPACES } from './symbols';
/**
 * Remove chars from beginning of string.
 */
const ltrim = (str: string, chars: string[]= WHITE_SPACES): string => {

  let start = 0;
  const  len = str.length;
  const  charLen = chars.length;
  let  found = true;

  while (found && start < len) {
    found = false;
    let i = -1;
    const c = str.charAt(start);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }

  return (start >= len) ? '' : str.substr(start, len);
};

export {
  ltrim
};
