import { not } from '../function';
import { } from '../predicate';
export * from './camelCase';
export * from './concat';
export * from './constants';
export * from './crop';
export * from './empty';
export * from './escapeHtml';
export * from './escapeRegExp';
export * from './escapeUnicode';
export * from './hyphenate';
export * from './lowerCase';
export * from './lpad';
export * from './ltrim';
export * from './quoteString';
export * from './removeNonASCII';
export * from './removeNonWord';
export * from './repeat';
export * from './replace';
export * from './replaceAccents';
export * from './rtrim';
export * from './slugify';
export * from './symbols';
export * from './toString';
export * from './trim';
export * from './truncate';
export * from './unCamelCase';
export * from './unescapeHtml';
export * from './unhyphenate';
export * from './upperCase';
import { repeat } from './repeat';
import { hyphenate } from './hyphenate';
export const repeatSpace = (a: number) => repeat('', a);

export const camelCaseToArray = (str: string): string[] => {
  return hyphenate(str).split('-');
};
/**
 * Checks if string ends with specified suffix.
 */
export const endsWith = (suffix: string) => (str: string) =>
  str.indexOf(suffix, str.length - suffix.length) !== -1;

export const notEndsWith = (substring: string) => not(endsWith(substring));
/**
 * Searches for a given substring
 * @since v0.1.0
 * @category String
 * @ts String -> String -> Boolean
 * @param {string} substring
 * @param {string} str
 * @return {boolean}
 */
export const includes = (str: string, substring: string, fromIndex = 0) => str.indexOf(substring, fromIndex) !== -1;
export { upperFirst, lowerFirst } from 'lodash';
export const contains = (substring: string) => (str: string) =>
  str.indexOf(substring, 0) !== -1;

export const ins = (v: string[]) => (str: string) =>
  v.includes(str);
export const notIn = (a: string[]) => (str: string) =>
  !ins(a)(str);

export const notContains = (substring: string) => not(contains(substring));
/**
 * Checks if string ends with specified suffix.
 */
export const startsWith = (suffix: string) => (str: string) =>
  str.indexOf(suffix, 0) !== -1;

export const notStartsWith = (substring: string) => not(startsWith(substring));
