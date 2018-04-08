/**
 * Escapes a string for insertion into HTML.
 */
const escapeHtml = (str: string): string => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');

export {
    escapeHtml
};
