
/**
 * The function returns a new string with some or all matches of a pattern replaced by a replacement.
 * The pattern can be a string or a RegExp,
 * and the replacement can be a string or a function to be called for each match.
 * @param {string|RegExp} pattern -A RegExp object or literal.
 * The match or matches are replaced with newSubStr or the value returned by the specified function.
 * @param {string|Function} replacement -
 * The String or function that replaces the substring specified by the specified regexp or substr parameter.
 * @param {string} str - The original string will remain unchanged.
 * @return {string} A new string with some or all matches of a pattern replaced by a replacement.
 */
const replace = (
    str: string, pattern: string | RegExp,
    replacement: string): string => str.replace(pattern, replacement);
export {
    replace
};
