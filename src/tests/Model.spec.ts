import { filter, catOptions, array } from '../Array';
import { stringCompare } from '../Compare';
import { Optional, Lens } from '../Monocle';
import { andArray, compose, constant, orArray } from '../function';
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
interface WhereInput {
    and?: WhereInput;
    or?: WhereInput;
    name?: string;
    nameNot?: string;
    nameStartsWith?: string;
    own?: string;
    ownNot?: string;
    ownEmpty?: boolean;
    isTxt?: boolean;
}

const whereInputName = Optional.fromNullableProp<WhereInput, string, 'name'>('name');
const whereInputNameNot = Optional.fromNullableProp<WhereInput, string, 'nameNot'>('nameNot');
const whereInputNameStartWith = Optional.fromNullableProp<WhereInput, string, 'nameStartsWith'>('nameStartsWith');
const whereInputOwn = Optional.fromNullableProp<WhereInput, string, 'own'>('own');
const whereInputOwnNot = Optional.fromNullableProp<WhereInput, string, 'ownNot'>('ownNot');
const whereInputOwnEmpty = Optional.fromNullableProp<WhereInput, boolean, 'ownEmpty'>('ownEmpty');
// const whereInputisTxt = Optional.fromNullableProp<WhereInput, boolean, 'isTxt'>('isTxt');
interface Filter {
    where: WhereInput;
    orderBy?: any;
    skip?: number;
    after?: string;
    before?: string;
    first?: number;
    last?: number;
}
const query = (_filter: Filter) => {
    return filter(files, getWhereInputCondition(_filter.where));
};
const getWhereInputCondition = (where: WhereInput, op: 'and' | 'or' = 'and') => {
    const _op = op === 'and' ? andArray : orArray;
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
