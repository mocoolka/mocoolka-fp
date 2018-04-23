import {
    getRecordSetoid,
    getProductSetoid,
    setoidString,
    setoidNumber,
} from '../Setoid';
describe('Setoid', () => {
    it('getRecordSetoid', () => {
        interface Person {
            name: string;
            age: number;
        }
        const S = getRecordSetoid<Person>({
            name: setoidString,
            age: setoidNumber,
        });
        expect(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 })).toEqual(true);
        expect(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 })).toEqual(false);
        expect(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 })).toEqual(false);
    });

    it('getProductSetoid', () => {
        const S = getProductSetoid(setoidString, setoidNumber);
        expect(S.equals(['a', 1], ['a', 1])).toEqual(true);
        expect(S.equals(['a', 1], ['b', 1])).toEqual(false);
        expect(S.equals(['a', 1], ['a', 2])).toEqual(false);
    });
});
