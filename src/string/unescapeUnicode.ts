
/**
 * Unescape unicode char sequences
 */
const unescapeUnicode = (str: string): string =>

  str.replace(/\\u[0-9a-f]{4}/g, (ch) => {
    const code = parseInt(ch.slice(2), 16);
    return String.fromCharCode(code);
  });

export {
  unescapeUnicode
};
