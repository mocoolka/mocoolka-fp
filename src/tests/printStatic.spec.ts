import { printSchema ,printInputSchema} from '../printStatic';
import { TSchema, fromObject, schemaWhereGetter } from '../Schema';
describe('printStaticSchema', () => {
    it('printStaticSchema', () => {
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
        expect(printInputSchema(s)(0)).toEqual(
            `export interface Ttest {
  name?: string;
}
`
        );
    });
    it('printStaticSchema', () => {

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

        expect(printInputSchema(fromObject(sc))(0)).toEqual(
            `export interface TFile {
  name: string;
  count: number;
  size?: number;
  isLock?: boolean;
  createAt?: string;
  updateAt?: number;
  id: string;
}
`        );

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

        expect(printInputSchema(fromObject(sc))(0)).toEqual(
            `export interface TRecursiveFile {
  name: string;
  count: number;
  size?: number;
  isLock?: boolean;
  createAt?: string;
  updateAt?: number;
  files?: [ TRecursiveFile ];
  id: string;
}
`        );
        expect(printSchema(schemaWhereGetter.get(fromObject(sc)))(0)).toEqual(
            `export interface TRecursiveFileWhereInput {
  AND?: TRecursiveFileWhereInput;
  OR?: TRecursiveFileWhereInput;
  name_eq?: string;
  name_not?: string;
  name_lt?: string;
  name_gt?: string;
  name_lte?: string;
  name_gte?: string;
  name_in?: [ string ];
  name_contains?: string;
  name_notContains?: string;
  name_notIn?: [ string ];
  name_startsWith?: string;
  name_endsWith?: string;
  name_notStartsWith?: string;
  name_notEndsWith?: string;
  count_eq?: number;
  count_not?: number;
  count_lt?: number;
  count_gt?: number;
  count_lte?: number;
  count_gte?: number;
  size_eq?: number;
  size_not?: number;
  size_lt?: number;
  size_gt?: number;
  size_lte?: number;
  size_gte?: number;
  isLock_eq?: boolean;
  isLock_not?: boolean;
  createAt_eq?: Date;
  createAt_not?: Date;
  createAt_lt?: Date;
  createAt_gt?: Date;
  createAt_lte?: Date;
  createAt_gte?: Date;
  updateAt_eq?: Date;
  updateAt_not?: Date;
  updateAt_lt?: Date;
  updateAt_gt?: Date;
  updateAt_lte?: Date;
  updateAt_gte?: Date;
  id_eq?: string;
  id_not?: string;
  id_lt?: string;
  id_gt?: string;
  id_lte?: string;
  id_gte?: string;
  id_in?: [ string ];
  id_contains?: string;
  id_notContains?: string;
  id_notIn?: [ string ];
  id_startsWith?: string;
  id_endsWith?: string;
  id_notStartsWith?: string;
  id_notEndsWith?: string;
}
`);

    });
});
