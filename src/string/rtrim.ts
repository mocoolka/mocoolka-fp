import { WHITE_SPACES } from './symbols';

/**
 * Remove chars from end of string.
 */
const rtrim = (str: string, chars: string[] = WHITE_SPACES): string => {

  let end = str.length - 1;
  const  charLen = chars.length;
  let  found = true;

  while (found && end >= 0) {
    found = false;
    let i = -1;
    const  c = str.charAt(end);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }

  return (end >= 0) ? str.substring(0, end + 1) : '';
};

export {
  rtrim
};
