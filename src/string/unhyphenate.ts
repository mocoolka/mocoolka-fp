
/**
 * Replaces hyphens with spaces. (only hyphens between word chars)
 */
const unhyphenate = (str: string): string => str.replace(/(\w)(-)(\w)/g, '$1 $3');

export {
    unhyphenate
};
