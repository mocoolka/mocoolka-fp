export const indentations: { [key: number]: string } = {
    1: '  ',
    2: '    ',
    3: '      ',
    4: '        ',
    5: '          ',
    6: '            ',
    7: '              ',
    8: '                ',
    9: '                  ',
};

export const indent = (i: number): string => {
    if (i === 0) {
        return '';
    }
    return indentations[i] || new Array(i).join(`  `);
};

export const printDescription = (description: string | undefined, i: number): string => {
    if (description) {
        return `${indent(i)}/** ${description} */\n`;
    }
    return '';
};

export const escapeString = (s: string): string => `\`${s.replace(/'/g, '\\\'')}\``;

export const isValidPropertyKey = (s: string): boolean => /[-\/\s]/.exec(s) === null;

export const escapePropertyKey = (key: string): string => isValidPropertyKey(key) ? key : escapeString(key);
