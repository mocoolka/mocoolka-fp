
/**
 * Repeat string n times
 */
const repeat = (str: string, times: number): string => {

  let result = '';
  if (times < 1) {
    return '';
  }

  while (times > 0) {
    if (times % 2) {
      result += str;
    }

    times = Math.floor(times / 2);
    str += str;
  }

  return result;
};

export {
  repeat
};
