import * as t from '../Type';
import { tryCatch } from '../Exception';
import { IO } from '../IO';
import { right } from '../Either';
describe('helper', () => {
    it('unionLiterals', () => {
        const MFileType = t.unionLiterals(['file', 'directory']);
        expect(MFileType.decode('file').getOrElse('error')).toEqual('file');
        expect(MFileType.decode('file1').getOrElse('error')).toEqual('error');
    });
    it('decodeFromAny', () => {
        const MFileType = t.unionLiterals(['file', 'directory']);
        expect(t.decodeFromAny(MFileType, 'file')).toEqual('file');
        expect(tryCatch(new IO(() => t.decodeFromAny(MFileType, 'file1'))).run().isLeft()).toEqual(true);
    });
    it('withDefault', () => {
        const M = t.withDefault(t.string, '123');
        expect(t.decodeFromAny(M, null)).toEqual('123');
        expect(t.decodeFromAny(M, '4')).toEqual('4');
        expect(tryCatch(new IO(() => t.decodeFromAny(M, 123))).run().isLeft()).toEqual(true);
    });
    it('partialDefault', () => {
        const M = t.partialDefault({
            sp: t.withDefault(t.number, 1),
        });
        expect(M.decode({}).getOrElse({ sp: 1 }).sp).toEqual(1);
        expect(M.decode({ sp: 2 }).getOrElse({ sp: 1 }).sp).toEqual(2);
    });
    it('lensesFromIntersection', () => {
        const RT2 = t.intersection([t.type(
            {
                s: t.string,
            }), t.partialDefault({
                sp: t.withDefault(t.string, '3'),
            }), t.partial({
            })]
        );
        const vTT2 = {
            s: '2',
            sp: '9',
        };
        const vTT2Out = {
            s: '1',
        };
        const v = RT2.decode(vTT2Out).getOrElse(vTT2);
        const RT2Lens = t.lensesFromIntersection(RT2);
        expect(RT2Lens.props.s.get(v)).toEqual('1');
        expect(RT2Lens.props.sp.get(v)).toEqual('3');

        const v1 = RT3.decode({ s: '1', sn: 2 }).getOrElse(vTT2);
        const RT3Lens = t.lensesFromIntersection(RT3);
        expect(RT3Lens.nullProps.sp.getOption(v1).isNone()).toEqual(true);
        expect(RT3Lens.nullProps.sn.getOption(v1).getOrElse(2)).toEqual(2);
    });
    it('dateFromNumber', () => {
        const d = new Date(2000, 1, 1);
        const millis = d.getTime();
        expect(t.dateFromNumber.decode(millis)).toEqual(right(d));
    });
    it('dateFromISOString', () => {
        const d = new Date(2000, 1, 1);
        const s = d.toISOString();
        expect(t.dateFromISOString.decode(s)).toEqual(right(d));
    });
    it('BasicGetter', () => {
        expect(t.BasicGetter.get('string').decode('1')).toEqual(right('1'));
    });
    it('RBasicTypeEnum', () => {
        expect(t.RBasicTypeEnum.decode('string')).toEqual(right('string'));
        expect(t.RBasicTypeEnum.decode('string1').isLeft()).toEqual(right('string'));
    });
});

export const RT1 = t.intersection([t.type(
    {
        s: t.string,
        n: t.number,
        i: t.integer,
        o: t.object,
        b: t.boolean,
        d: t.dateFromNumber,
    }), t.partial({
        sp: t.string,
        np: t.number,
        ip: t.integer,
        op: t.object,
        bp: t.boolean,
        dp: t.dateFromNumber,
    })]
);

export const RT = t.intersection([t.type(
    {
        s: t.string,
        n: t.number,
        i: t.integer,
        o: t.object,
        b: t.boolean,
        d: t.dateFromNumber,
        t: RT1,
    }), t.partial({
        sp: t.string,
        np: t.number,
        ip: t.integer,
        op: t.object,
        bp: t.boolean,
        dp: t.dateFromNumber,
        tp: RT1,
    })]
);

const RT3 = t.intersection([
    t.type({
        s: t.string,
    }), t.partialDefault({

    }), t.partial({
        sp: t.string,
        sn: t.number,
    })]
);

/*
type TDirectory = {
    name: string;
    atime: number;
    mtime: number;
    ctime: number;
    own: string;
    group: string;
    size: number;
    location: string;
    subs?: TDirectory[];
    files?: TFile[];
};

const MDirectory =
    t.recursion<TDirectory>
        ('IDirectory',
        self => t.intersection(
            [
                t.type({
                    name: t.string,

                }),
                t.partial({
                    subs: t.array(self),
                    files: t.array(MFile),
                }),
            ])
        ); */

const file = {
    n: 1.2,
    i: 1,
    d: 100,
    o: {},
    b: false,
    s: 'name',
    np: 100,
    t: {
        n: 1.2,
        i: 1,
        d: 100,
        o: {},
        b: false,
        s: 'name',
        np: 100,
    },

};
const file1 = {
    n: 1.2,
    i: 1,
    d: new Date(),
    o: {},
    b: false,
    s: 'name',
    t: {
        n: 1.2,
        i: 1,
        d: new Date(),
        o: {},
        b: false,
        s: 'name',
        np: 100,
    },

};
const fileIN = RT.decode(file).getOrElse(file1);
// console.error(t.lensesFromIntersection(RT).props.t.set());
// console.error(t.lensesFromIntersection(RT).allprops.tp.get(fileIN));
//console.log(RT.decode(file).getOrElse({}));
//console.log(RT.encode(RT.decode(file).getOrElse({})));
/* const files: TFile[] = [
    { id: 'r1', name: 'a.txt', own: 'a1', isTxt: true, size: 1000 },
    { id: 'r2', name: 'a1.txt', own: 'a1', isTxt: false, size: 2000 },
    { id: 'r3', name: 'a1.txt', own: 'b1', isTxt: false, size: 3000 },
    { id: 'r4', name: 'a1.txt', isTxt: false, size: 4000 },
];
const filesE = [
    { id: 'r1', own: 'a1', isTxt: true, size: 1000 },
    { id: 'r2', name: 'a1.txt', own: 'a1', isTxt: false, size: 2000 },
    { id: 'r3', name: 'a1.txt', own: 'b1', isTxt: false, size: 3000 },
    { id: 'r4', name: 'a1.txt', isTxt: false, size: 4000 },
];

const d: TDirectory = {
    name: 'root',
    subs: [{
        name: 'core',
        subs: [{
            name: 'core1',
            files: files,
        }],
        files: files,
    }],
}; */
/* console.log(MFiles.decode(files).value);
console.log(MFiles.decode(filesE).getOrElseL(errors => {
    return t.failure(errors).join('\n');
}));
console.log(MDirectory.decode(d).getOrElseL(errors => {
    return t.failure(errors).join('\n');
})); */
