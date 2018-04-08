
/**
 * Searches for a given substring
 * @since v0.1.0
 * @category String
 * @ts String -> String -> Boolean
 * @param {string} substring
 * @param {string} str
 * @return {boolean}
 */
const includes = (str: string, substring: string, fromIndex = 0) => str.indexOf(substring, fromIndex) !== -1;

export {
    includes
};
