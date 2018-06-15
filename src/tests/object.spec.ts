import {
    moveAndFillRightObject,
    withDefaults,
    withDefaultsF
} from '../object';
describe('object', () => {
    it('moveRightObject', () => {
        expect(moveAndFillRightObject({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 1, c: 2 });
    });
    it('withDefaults', () => {
        interface A1 {
            a: string;
            b: number;
            c: number;
        }
        interface AD {
            a: string;
            b: number;
        }
        const aDefault: AD = {
            a: '',
            b: 1,
        };
        const d = withDefaults<AD, A1>(aDefault);
        const result: A1 = d({ c: 1 });
        expect(result).toEqual({
            a: '',
            b: 1,
            c: 1,
        });
        expect(d({ a: '1', b: 2, c: 3 })).toEqual({ a: '1', b: 2, c: 3 });
    });
    it('withDefaults', () => {
        interface A1 {
            a: string;
            b: number;
            c: number;
        }
        interface AD {
            a: string;
            b: number;
        }
        const aDefault: AD = {
            a: '123',
            b: 1,
        };
        const f = (a: A1): string => {
            return a.a;
        };
        const d = withDefaultsF<AD, A1, string>(aDefault)(f);
        const result: string = d({ c: 1 });
        expect(result).toEqual('123');
        expect(d({ a: '1', b: 2, c: 3 })).toEqual('1');
    });
});
