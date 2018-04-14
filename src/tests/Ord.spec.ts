import {
    ordString,

} from '../Ord';
describe('Setoid', () => {
    it('ordString', () => {
        expect(ordString.equals('a', 'a')).toEqual(true);
        expect(ordString.equals('a', 'b')).toEqual(false);
        expect(ordString.compare('a', 'b')).toEqual(-1);
        expect(ordString.compare('b', 'a')).toEqual(1);
        expect(ordString.compare('a', 'a')).toEqual(0);
    });

});