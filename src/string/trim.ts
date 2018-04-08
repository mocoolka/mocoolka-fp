import { WHITE_SPACES } from './symbols';

import { ltrim } from './ltrim';
import { rtrim } from './rtrim';
/**
 * Remove white-spaces from beginning and end of string.
 */
const trim = (str: string, chars: string[] = WHITE_SPACES): string => ltrim(rtrim(str, chars), chars);

export {
    trim
};
