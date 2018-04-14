export const isPositiveNumberOrZero = (num: number) => Number.isFinite(num) && num >= 0;
import { or } from './function';

export const getTypeName = (value: any) => {
    const typeofObj = typeof value;
    if (typeofObj !== 'object' && typeofObj !== 'function') {
        return typeofObj;
    }

    if (value === null) {
        return 'null';
    }

    if (typeofObj === 'function') {
        return typeofObj;
    }
    return Object.prototype.toString.call(value).slice(8, -1);
};

/*
* Determines whether the passed value is a specific "kind".
* @since v0.1.0
*/
export const isTypeName = (strTypeName: string) => <T>(a: any): a is T => getTypeName(a) === strTypeName;
/*
* Returns true if the given value is an Argument .
*/

export const isArguments = isTypeName('Arguments');

/*
 * Determines whether the passed value is an Array.
 */
export const isArray = <T>(a: any): a is T[] => getTypeName(a) === 'Array';

export const isArrayLike = (value: any) => value && typeof value.length === 'number';
/*
 * Determines whether the passed value is a Boolean instance.
 */
export const isBoolean = (a: any): a is boolean => 'boolean' === getTypeName(a);

/*
 * Determines whether the passed value is a Date instance.
 */
export const isDate = (a: any): a is Date => 'Date' === getTypeName(a);

/*
 * Determines whether the passed value is empty.
 */
export const isEmpty = (val: any) => {
    if (val == null) {
        // typeof null == 'object' so we check it first
        return true;
    } else if (typeof val === 'string' || isArray(val)) {
        return !val.length;
    } else if (typeof val === 'object') {
        return Object.keys(val).length === 0;
    } else {
        return true;
    }
};

/*
* Determines whether the passed value is a Error.
*/
export const isError = (a: any): a is Error => 'Error' === getTypeName(a);
/*
 * Determines whether the passed value is null .
 */

/*
* Determines whether the passed value is Finite.
*/
export const isFinite = (val: any) => {
    let is = false;
    if (isString(val) && val !== '') {
        is = Number.isFinite(parseFloat(val));
    } else if (isNumber(val)) {
        // need to use isNumber because of Number constructor
        is = Number.isFinite(val);
    }

    return is;
};

/*
* Determines whether the passed value is a Function.
*/
//tslint:disable
export const isFunction = (a: any): a is Function => 'function' === getTypeName(a);
// tslint:enable

/*
 * Determines whether the passed value is a Integer .
 */
export const isInteger = (val: any) => {
    return isNumber(val) && (val % 1 === 0);
};

const REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@__mocoolka-iterator__@@';
const getIterator = (iterable: any) => {
    const iteratorFn = iterable &&
        ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
            iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
        return iteratorFn;
    }
};
export const isIterable = <T>(a: any): a is Iterable<T> => {
    return a && typeof getIterator(a) === 'function';
};

export const isIterator = <T>(a: any): a is Iterator<T> => {
    return a && typeof a.next === 'function';
};

/*
* Determines whether the passed value is NaN .
*/
export const isNaN = (val: any) => !isNumber(val) || $isNaN(Number(val));
/*tslint:disable */
const $isNaN = (val: any) => val != val;

/*
 * Determines whether the passed value is number .
 */
export const isNumber = (a: any): a is number => 'number' === getTypeName(a);

/*
 * Determines whether the passed value is a object .
 */
export const isObject = (a: any): a is { [name: string]: any } => 'Object' === getTypeName(a);

export type TPlainObject<T>={ [name: string]: T };
/*
 * Determines whether the passed value is a object .
 */
export const isPlainObject = <T>(a: any): a is TPlainObject<T> => 'Object' === getTypeName(a);

/*
 * Determines whether the passed value is a RegExp .
 * Primitive types define immutable values (values, which are incapable of being changed).
 */

export const isRegExp = (a: any): a is RegExp => 'RegExp' === getTypeName(a);

export const isSameType = (a: any, b: any) => getTypeName(a) === getTypeName(b);

/*
 * Determines whether the passed value is a string .
 */
export const isString = (a: any): a is string => typeof a === 'string';

export const isTypedArray = (ar: any) => {
    // Unfortunately there's no way to check if an object is a TypedArray
    // We have to check if it's one of these types
    return (typeof ar === 'object' && /\w+Array]$/.test(Object.prototype.toString.call(ar)));
};




const UNDEF = undefined;

/*
 * Determines whether the passed value is a undefined .
 */
export const isUndefined = (val: any): val is undefined => val === UNDEF;

export const propExist = (a: { [name: string]: any }, propName: string) => a[propName] !== undefined;


export const isNull = (val: any): val is null => val === null;
export const isNil = or(isUndefined, isNull);