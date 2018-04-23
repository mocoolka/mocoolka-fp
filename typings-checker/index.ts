import * as t from '../src/Type';
import {  TSchema, RSchema } from '../src/Schema';
type ARSchema = t.TypeOf<typeof RSchema>;
const g1: ARSchema = {
    name: 'ass',
    properties: [],
    strict: false,
    forceId: true,
};
const t1: TSchema = {
    name: '1',
    forceId: false,
    strict: false,
    properties: [{
        name: 'name1',
        type: 'string',
        required: false,
        description: 'id',
        id: false,
        unique: false,
    }],

};
const M1 = t.partial({
    sp: t.withDefault(t.number, 1),
});
type a1 = t.TypeOf<typeof M1>;
type b1 = t.OutputOf<typeof M1>;

export const RT3 = t.intersection([t.type(
    {
        s: t.string,
    }), t.partial({
        sp: t.withDefault(t.string, '3'),
    })]
);
export type TT3 = t.TypeOf<typeof RT3>;
export type TT3Out = t.OutputOf<typeof RT3>;

export const vTT3: TT3 = {
    s: '2',
    sp: '9',
};
export const vTT3E: TT3 = {
    s: '2',
};
export const vTT3Out: TT3Out = {
    s: '1',
};
