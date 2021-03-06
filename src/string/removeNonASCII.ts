
/**
 * Remove non-printable ASCII chars
 * http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
 */
const removeNonASCII = (str: string): string => str.replace(/[^\x20-\x7E]/g, '');

export {
    removeNonASCII
};
