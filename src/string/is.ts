
/*
 * Determines whether the passed value is a string .
 * @since v0.1.0
 * @category predicate
 * @ts a -> boolean
 * @keywords is assert
 * @param {*} value -The value to be checked.
 * @return {Boolean} result -True if the value is string otherwise return false.
 */
const isString = (a: string): boolean => typeof a === 'string';

export {
    isString
};
