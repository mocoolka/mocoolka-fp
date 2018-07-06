import { getObjectMSemigroup } from '../Semigroup';
describe('Semigroup', () => {
    it('getObjectSemigroup', () => {
        interface A<B> {
            [key: string]: B;
        }
        interface P {
            a: string;
            b: string;
            c: string;
        }
        type AP = A<Array<keyof P>>;
        const a: AP = {
            c1: ['a', 'b'],
        };
        const b: AP = {
            c1: ['a', 'b','c',],
            c2: ['c'],
        };
        const S = getObjectMSemigroup<AP>();
        const result: AP = S.concat(a, b);
        expect(result).toEqual({ c1: ["a", "b", "a", "b", "c"], c2: ['c'] });
    });
});
