import { printGraphqlSchema } from '../printGraphql';
import { TSchema,  fromObject } from '../Schema';
it('printGraphqlSchema', () => {
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

    expect(printGraphqlSchema(s)(0)).toEqual(
        `type test {
  name: String
}
`
    );
    expect(printGraphqlSchema(fromObject(sc))(0)).toEqual(
`type File {
  name: String!
  count: Int!
  size: Float
  isLock: Boolean
  createAt: String
  updateAt: Float
  id: ID!
}
`        );

});
