export * from 'fp-ts/lib/Setoid';
import { strictEqual, Setoid, getArraySetoid, setoidString } from 'fp-ts/lib/Setoid';
import { isNil, isArray } from './predicate';

export declare type BaiscType = number | string | boolean | symbol | undefined | null;
export const basicTypeEqual = <A extends BaiscType>(a: A, b: A) => {

    if (isNil(a) && isNil(b)) {
        return true;
    } else {
        return strictEqual(a, b);
    }
};
export const basicTypeSetoid = {
    string: setoidString,
};
export const setoidBasicType: Setoid<BaiscType> = { equals: basicTypeEqual };

/** @function */
export const getArrayASetoid = <A>(S: Setoid<A>): Setoid<A[] | A> => {
    return {
        equals: (a, b) => {
            if (isArray(a) && isArray(b)) {
                return getArraySetoid(S).equals(a, b);
            } else if (isArray(a) || isArray(b)) {
                return false;
            } else {
                return S.equals(a, b);
            }
        },
    };
};
