import { printProperty, printSchema } from '../PrintRuntime';
import { TSchema, TProperty, fromObject, schemaWhereGetter } from '../Schema';
describe('predicate', () => {
    it('printArrayProperty', () => {
        const p: TProperty = {
            name: 'name1',
            type: ['string'],
            required: true,
            description: 'id',
            id: false,
            unique: false,
        };
        expect(printProperty({})(p)(0)).toEqual(
            `/** id */
name1: t.array(t.string)`
        );
    });
    it('printArrayIdentity', () => {
        const p: TProperty = {
            name: 'name1',
            type: ['Node'],
            required: true,
            description: 'id',
            id: false,
            unique: false,
        };
        expect(printProperty({})(p)(0)).toEqual(
            `/** id */
name1: t.array(RNode)`
        );
    });
    it('printIdentity', () => {
        const p: TProperty = {
            name: 'name1',
            type: 'Node',
            required: true,
            description: 'id',
            id: false,
            unique: false,
        };
        expect(printProperty({})(p)(0)).toEqual(
            `/** id */
name1: RNode`
        );
    });
    it('printProperty', () => {
        const p: TProperty = {
            name: 'name1',
            type: 'string',
            required: true,
            description: 'id',
            id: false,
            unique: false,
        };
        expect(printProperty({})(p)(0)).toEqual(
            `/** id */
name1: t.string`
        );

    });
    it('printSchema', () => {
        const s: TSchema = {
            name: 'test',
            properties: [{
                name: 'name',
                id: false,
                required: false,
                type: 'string',
                unique: false,
            }],
            forceId: true,
            strict: true,
        };
        const sc = {
            name: 'File',
            description: 'File System',
            properties: [{
                name: 'name',
                type: 'string',
                required: true,
                description: 'file name',
            },
            {
                name: 'count',
                type: 'integer',
                required: true,
                description: 'file count',
            },
            {
                name: 'size',
                type: 'number',
                description: 'file size',
                defaultValue: 123,
            },
            {
                name: 'isLock',
                type: 'boolean',
                description: 'Is file locked',
                defaultValue: true,
            },
            {
                name: 'createAt',
                description: 'file date on create',
                type: 'dateFromISOString',
            },
            {
                name: 'updateAt',
                description: 'file update on create',
                type: 'dateFromNumber',
            },
            ],
        };
        expect(printSchema(s)(0)).toEqual(
            `export const Rtest = t.readonly(
  t.intersection([
    t.strict({

    }),
    t.partial({
      name: t.string,
    }),
  ])
);`
        );
        expect(printSchema(fromObject(sc))(0)).toEqual(
            `/** File System */
export const RFile = t.readonly(
  t.intersection([
    t.strict({
      /** file name */
      name: t.string,
      /** file count */
      count: t.integer,
      id: t.string,
    }),
    t.partial({
      /** file size */
      size: t.withDefault(t.number, 123),
      /** Is file locked */
      isLock: t.withDefault(t.boolean, true),
      /** file date on create */
      createAt: t.dateFromISOString,
      /** file update on create */
      updateAt: t.dateFromNumber,
    }),
  ])
);`);
    });
    it('print Recursive StaticSchema', () => {

        const sc = {
            name: 'RecursiveFile',
            description: 'File System',
            properties: [{
                name: 'name',
                type: 'string',
                required: true,
                description: 'file name',
            },
            {
                name: 'count',
                type: 'integer',
                required: true,
                description: 'file count',
            },
            {
                name: 'size',
                type: 'number',
                description: 'file size',
                defaultValue: 123,
            },
            {
                name: 'isLock',
                type: 'boolean',
                description: 'Is file locked',
                defaultValue: true,
            },
            {
                name: 'createAt',
                description: 'file date on create',
                type: 'dateFromISOString',
            },
            {
                name: 'updateAt',
                description: 'file update on create',
                type: 'dateFromNumber',
            },
            {
                name: 'files',
                description: 'child files',
                type: ['RecursiveFile'],
            },
            ],
        };

        expect(printSchema(fromObject(sc))(0)).toEqual(
            `/** File System */
export const RRecursiveFile = t.readonly(
t.recursion<TRecursiveFile>('RRecursiveFile', self =>
  t.intersection([
    t.strict({
      /** file name */
      name: t.string,
      /** file count */
      count: t.integer,
      id: t.string,
    }),
    t.partial({
      /** file size */
      size: t.withDefault(t.number, 123),
      /** Is file locked */
      isLock: t.withDefault(t.boolean, true),
      /** file date on create */
      createAt: t.dateFromISOString,
      /** file update on create */
      updateAt: t.dateFromNumber,
      /** child files */
      files: t.array(self),
    }),
  ])
)
);`        );

        expect(printSchema(schemaWhereGetter.get(fromObject(sc)))(0)).toEqual(
            `/** File System */
export const RRecursiveFile = t.readonly(
t.recursion<TRecursiveFile>('RRecursiveFile', self =>
t.intersection([
t.strict({
/** file name */
name: t.string,
/** file count */
count: t.integer,
id: t.string,
}),
t.partial({
/** file size */
size: t.withDefault(t.number, 123),
/** Is file locked */
isLock: t.withDefault(t.boolean, true),
/** file date on create */
createAt: t.dateFromISOString,
/** file update on create */
updateAt: t.dateFromNumber,
/** child files */
files: t.array(self),
}),
])
)
);`        );
    });
});
