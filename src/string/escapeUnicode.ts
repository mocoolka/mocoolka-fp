
/**
 * Escape string into unicode sequences
 */
const escapeUnicode = (str: string, shouldEscapePrintable: boolean): string => {

  return str.replace(/[\s\S]/g, (ch) => {
    // skip printable ASCII chars if we should not escape them
    if (!shouldEscapePrintable && (/[\x20-\x7E]/).test(ch)) {
      return ch;
    }
    // we use "000" and slice(-4) for brevity, need to pad zeros,
    // unicode escape always have 4 chars after "\u"
    return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4);
  });
};

export {
  escapeUnicode
};
