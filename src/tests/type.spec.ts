import * as t from '../Type';
import { tryCatch } from 'mocoolka-fp/lib/Exception';
import { IO } from 'mocoolka-fp/lib//IO';
import { right } from 'mocoolka-fp/lib//Either';
describe('helper', () => {
    it('decodeFromAny', () => {
        expect(t.decodeFromAny(t.string)('file')).toEqual('file');
        expect(tryCatch(new IO(() => t.decodeFromAny(t.string)(1))).run().isLeft()).toEqual(true);
    });
    it('withDefault', () => {
        const M = t.withDefault(t.string, '123');
        expect(t.decodeFromAny(M)(null)).toEqual('123');
        expect(t.decodeFromAny(M)('4')).toEqual('4');
        expect(tryCatch(new IO(() => t.decodeFromAny(M)(123))).run().isLeft()).toEqual(true);
    });
    it('lensesFromIntersection', () => {
        const RT2 = t.intersection([t.type(
            {
                s: t.string,
                sp: t.withDefault(t.string, '3'),
            }), t.partial({
                sn: t.number,
                s1: t.number,
            })]
        );
        const v = t.decodeFromAny(RT2)({ s: '1' });
        const RT2Lens = t.lensesFromIntersection(RT2);
        expect(RT2Lens.props.s.get(v)).toEqual('1');
        expect(RT2Lens.props.sp.get(v)).toEqual('3');

        const v1 = t.decodeFromAny(RT2)({ s: '1', sn: 2 });
        expect(RT2Lens.nullProps.s1.getOption(v1).isNone()).toEqual(true);
        expect(RT2Lens.nullProps.sn.getOption(v1).getOrElse(3)).toEqual(2);
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
    it('RBasicType', () => {
        expect(t.RBasicType.decode('string')).toEqual(right('string'));
        expect(t.RBasicType.decode('string1').isLeft()).toEqual(true);
    });
    it('typeFromString', () => {
        expect(t.typeFromString.decode('string')).toEqual(right({ name: 'string', isArray: false }));
        expect(t.typeFromString.decode(['string'])).toEqual(right({ name: 'string', isArray: true }));
        expect(t.typeFromString.decode(['Node'])).toEqual(right({ name: 'Node',  isArray: true }));
        expect(t.typeFromString.decode('Node')).toEqual(right({ name: 'Node',  isArray: false }));
        expect(t.typeFromString.decode(['Node', '1']).isLeft()).toEqual(true);
        expect(t.typeFromString.decode({ Node: '1' }).isLeft()).toEqual(true);
        expect(t.typeFromString.decode(1).isLeft()).toEqual(true);
        expect(t.typeFromString.decode(false).isLeft()).toEqual(true);
        expect(t.typeFromString.encode({ name: 'string',  isArray: false })).toEqual('string');
    });
});
