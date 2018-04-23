import { filter, catOptions, array } from '../Array';
import { stringCompare, ConditionString, TStringCompareKeys } from '../Compare';
import { Lens } from '../Monocle';
import { andArray, compose, constant, orArray } from '../function';
import { get } from '../object';
import { isNil } from '../predicate';
interface MFile {
    id: string;
    name: string;
    own?: string;
    isTxt: boolean;
    size?: number;
    date?: string;
}
const mFileId = Lens.fromProp<MFile, 'id'>('id');
const mFileName = Lens.fromProp<MFile, 'name'>('name');
const mFileOwn = Lens.fromNullableProp<MFile, string, 'own'>('own', '');
const mFileOwnWithNull = Lens.fromProp<MFile, 'own'>('own');
// const mFileIsTxt = Lens.fromProp<MFile, 'isTxt'>('isTxt');
// const mFileDate = Lens.fromProp<MFile, 'date'>('date');
// Lens.fromNullableProp<MFile, string, 'own'>('own', '').asFold().exist;

const condition1: Array<ConditionString<MFile, 'in'>> = [
    {
        name: 'name',
        op: 'in',
        value: ['a.txt'],
    },
];
interface WhereInput<A> {
    and?: WhereInput<A>;
    condition: Array<ConditionString<A, TStringCompareKeys>>;
    or?: WhereInput<A>;
}
const query = () => {
    return filter(files, getWhereInputCondition(_filter.where));
};
const getWhereInputCondition = <A>(where: WhereInput<A>, op: 'and' | 'or' = 'and') => {
    const _op = op === 'and' ? andArray : orArray;
    where.condition.forEach(a => {
        const c = stringCompare[a.op];
        //mFileName.asFold().exist(stringCompare[a.op](a.value));
    });
    const nameEq = whereInputName.getOption(where).map(stringCompare.eq).map(mFileName.asFold().exist);
    const nameNotEq = whereInputNameNot.getOption(where)
        .map(stringCompare.not).map(mFileName.asFold().exist);
    const nameStartWith = whereInputNameStartWith.getOption(where)
        .map(stringCompare.startsWith).map(mFileName.asFold().exist);

    const ownEq = whereInputOwn.getOption(where).map(stringCompare.eq).map(mFileOwn.asFold().exist);
    const ownEqNot = whereInputOwnNot.getOption(where).map(stringCompare.not).map(mFileOwn.asFold().exist);
    const ownEmpty = whereInputOwnEmpty.getOption(where)
        .map(constant(isNil)).map(mFileOwnWithNull.asFold().exist);
    let compare = _op(catOptions([nameEq, nameNotEq, nameStartWith, ownEq, ownEqNot, ownEmpty]));
    if (where.and) {
        compare = _op([compare, getWhereInputCondition(where.and, 'and')]);
    }
    if (where.or) {
        compare = _op([compare, getWhereInputCondition(where.or, 'or')]);
    }
    return compare;
};
const files: MFile[] = [
    { id: 'r1', name: 'a.txt', own: 'a1', isTxt: true, size: 1000 },
    { id: 'r2', name: 'a1.txt', own: 'a1', isTxt: false, size: 2000 },
    { id: 'r3', name: 'a1.txt', own: 'b1', isTxt: false, size: 3000 },
    { id: 'r4', name: 'a1.txt', isTxt: false, size: 4000 },
];
const filterNameA1 = [
    { id: 'r2', name: 'a1.txt', own: 'a1', isTxt: false, size: 2000 },
    { id: 'r3', name: 'a1.txt', own: 'b1', isTxt: false, size: 3000 },
    { id: 'r4', name: 'a1.txt', isTxt: false, size: 4000 },
];
const keys = (s: MFile[]) => array.map(s, mFileId.get);
const queryKeys = compose(keys, query);
describe('whereInput', () => {
    it('field required with string', () => {
        expect(query({ where: { name: 'a1.txt' } })).toEqual(filterNameA1);
        expect(queryKeys({ where: { nameNot: 'a1.txt' } })).toEqual(['r1']);
        expect(queryKeys({ where: { nameStartsWith: 'a1.t' } })).toEqual(['r2', 'r3', 'r4']);
    });
    it('field optional with string', () => {
        expect(queryKeys({ where: { own: 'a1' } })).toEqual(['r1', 'r2']);
        expect(queryKeys({ where: { ownNot: 'a1' } })).toEqual(['r3', 'r4']);
        expect(queryKeys({ where: { ownEmpty: true } })).toEqual(['r4']);
    });
    it('compose field required with string and field optional with string', () => {
        expect(queryKeys({ where: { own: 'a1', name: 'a1.txt' } })).toEqual(['r2']);
    });
    it('and', () => {
        expect(queryKeys({ where: { own: 'a1', and: { name: 'a1.txt' } } })).toEqual(['r2']);
        expect(queryKeys({ where: { name: 'a1.txt', and: { own: 'a1' } } })).toEqual(['r2']);
        expect(queryKeys({ where: { own: 'a1', or: { name: 'a1.txt' } } })).toEqual(['r2']);
        expect(queryKeys({ where: { name: 'a1.txt', or: { own: 'a1' } } })).toEqual(['r2']);
    });
    it('or', () => {
        expect(queryKeys({ where: { or: { own: 'a1', name: 'a.txt' } } })).toEqual(['r1', 'r2']);
        expect(queryKeys({ where: { or: { own: 'a1', and: { own: 'a1' } } } })).toEqual(['r1', 'r2']);
    });
});
const a1 = { id: 'r2', name: 'a1.txt', own: 'a1', isTxt: false, size: 2000 };
const condition = { fieldName: name, condition: 'Not', value: 'a1.txt' } );
stringCompare.eq(get('value');
const v = (o) => {

    condition.value;
};
a1.name;
