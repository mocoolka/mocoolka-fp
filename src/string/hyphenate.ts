
const _uppercasePattern = /([A-Z])/g;
/**
 * Replaces spaces with hyphens, split camelCase text,
 * remove non-word chars, remove accents and convert to lower case.
 */

export const hyphenate = (str: string, split: string = '-') => {
    return str.replace(_uppercasePattern, split + '$1').toLowerCase();
};
