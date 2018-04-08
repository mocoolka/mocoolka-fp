
/**
 * Escape RegExp string chars.
 */
const escapeRegExp = (str: string): string => str.replace(/\W/g, '\\$&');

export {
    escapeRegExp
};
