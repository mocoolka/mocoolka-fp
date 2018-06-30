import {
    getRecordSetoid,
    getProductSetoid,
    setoidString,
    setoidNumber,
    getArrayASetoid,

} from '../Setoid';
describe('Setoid', () => {

    it('getProductSetoid', () => {
        const S = getProductSetoid(setoidString, setoidNumber);
        expect(S.equals(['a', 1], ['a', 1])).toEqual(true);
        expect(S.equals(['a', 1], ['b', 1])).toEqual(false);
        expect(S.equals(['a', 1], ['a', 2])).toEqual(false);
    });
    it('getArrayASetoid', () => {
        expect(getArrayASetoid(setoidString).equals(['a', 'b'], ['a', 'b'])).toEqual(true);
        expect(getArrayASetoid(setoidString).equals('a', 'a')).toEqual(true);
        expect(getArrayASetoid(setoidString).equals(['a', 'b'], 'a')).toEqual(false);

    });
    it('getRecordSetoid', () => {
        interface Person {
            name: string;
            age: number;
            type: string | string[];
            ti?: string;
        }
        const S = getRecordSetoid<Person>({
            name: setoidString,
            age: setoidNumber,
            type: getArrayASetoid(setoidString),
        });
        expect(S.equals({ name: 'a', age: 1, type: 'string' },
            { name: 'a', age: 1, type: 'string' })).toEqual(true);
        expect(S.equals({ name: 'a', age: 1, type: ['string'] },
            { name: 'a', age: 1, type: ['string'] })).toEqual(true);
        expect(S.equals({ name: 'a', age: 1, type: ['string'] },
            { name: 'a', age: 1, type: 'string' })).toEqual(false);
        expect(S.equals({ name: 'a', age: 1, type: ['string'] },
            { name: 'a', age: 2, type: ['string'] })).toEqual(false);
    });
});
