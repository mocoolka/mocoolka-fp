
import {replaceAccents} from './replaceAccents';
import {removeNonWord} from './removeNonWord';
import {lowerCase} from './lowerCase';
import {trim} from './trim';

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
const slugify = (str: string, delimeter: string= '-'): string =>
 lowerCase(trim(removeNonWord(replaceAccents(str))).replace(/ +/g, delimeter));

export {
    slugify
};
