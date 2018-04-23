import * as t from '../Type';
export interface TRecursiveFileWhereInput {
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
export const RRecursiveFileWhereInput = t.readonly(
  t.recursion<TRecursiveFileWhereInput>('RRecursiveFileWhereInput', self =>
    t.intersection([
      t.strict({

      }),
      t.partial({
        AND: self,
        OR: self,
        name_eq: t.string,
        name_not: t.string,
        name_lt: t.string,
        name_gt: t.string,
        name_lte: t.string,
        name_gte: t.string,
        name_in: t.array(t.string),
        name_contains: t.string,
        name_notContains: t.string,
        name_notIn: t.array(t.string),
        name_startsWith: t.string,
        name_endsWith: t.string,
        name_notStartsWith: t.string,
        name_notEndsWith: t.string,
        count_eq: t.integer,
        count_not: t.integer,
        count_lt: t.integer,
        count_gt: t.integer,
        count_lte: t.integer,
        count_gte: t.integer,
        size_eq: t.number,
        size_not: t.number,
        size_lt: t.number,
        size_gt: t.number,
        size_lte: t.number,
        size_gte: t.number,
        isLock_eq: t.boolean,
        isLock_not: t.boolean,
        createAt_eq: t.dateFromISOString,
        createAt_not: t.dateFromISOString,
        createAt_lt: t.dateFromISOString,
        createAt_gt: t.dateFromISOString,
        createAt_lte: t.dateFromISOString,
        createAt_gte: t.dateFromISOString,
        updateAt_eq: t.dateFromNumber,
        updateAt_not: t.dateFromNumber,
        updateAt_lt: t.dateFromNumber,
        updateAt_gt: t.dateFromNumber,
        updateAt_lte: t.dateFromNumber,
        updateAt_gte: t.dateFromNumber,
        id_eq: t.string,
        id_not: t.string,
        id_lt: t.string,
        id_gt: t.string,
        id_lte: t.string,
        id_gte: t.string,
        id_in: t.array(t.string),
        id_contains: t.string,
        id_notContains: t.string,
        id_notIn: t.array(t.string),
        id_startsWith: t.string,
        id_endsWith: t.string,
        id_notStartsWith: t.string,
        id_notEndsWith: t.string,
      }),
    ])
  )
);

const a = [
  { name: 'k_eq', type: 'string' },
  { name: 'k_not', type: 'string' },
  { name: 'k_lt', type: 'string' },
  { name: 'k_gt', type: 'string' },
  { name: 'k_lte', type: 'string' },
  { name: 'k_gte', type: 'string' },
  { name: 'k_in', type: ['string'] },
  { name: 'k_contains', type: 'string' },
  { name: 'k_notContains', type: 'string' },
  { name: 'k_notIn', type: ['string'] },
  { name: 'k_startsWith', type: 'string' },
  { name: 'k_endsWith', type: 'string' },
  { name: 'k_notStartsWith', type: 'string' }, { name: 'k_notEndsWith', type: 'string' }];
export interface TRecursiveFile {
  name: string;
  count: number;
  size?: number;
  isLock?: boolean;
  createAt?: Date;
  updateAt?: Date;
  files?: TRecursiveFile[];
  id: string;
}
/** File System */
export const RRecursiveFile = t.readonly(
  t.recursion<TRecursiveFile>('RRecursiveFile', RecursiveFile =>
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
        files: t.array(RecursiveFile),
      }),
    ])
  )
);
export interface TFile {
  name: string;
  count: number;
  size?: number;
  isLock?: boolean;
  createAt?: string;
  updateAt?: number;
  id: string;
}

export type File =
  & {
    /** id */
    id: string;
    /** file name */
    name: string;
    /** file name */
    age: number;
  }
  & {
    /** file name */
    size: number;
    /** file name */
    isYoung: boolean;
  }
  & {
    createAt?: Date;
    updateAt?: Date;
    any?: any;
    object?: { [key: string]: t.mixed };
    anyDictionary?: t.AnyDictionaryType;
    anyArray?: t.mixed[];
  };
export const test = t.readonly(
  t.intersection([
    t.strict({

    }),
    t.partial({
      name: t.string,
    }),
    t.partialDefault({

    }),
  ])
);
/** File System */
export const File = t.readonly(
  t.intersection([
    t.strict({
      /** id */
      id: t.string,
      /** file name */
      name: t.string,
      /** file count */
      count: t.integer,
    }),
    t.partial({
      /** file date on create */
      createAt: t.dateFromISOString,
      /** file update on create */
      updateAt: t.dateFromNumber,
      /** file test */
      object: t.object,
    }),
    t.partialDefault({
      /** file size */
      size: t.withDefault(t.number, 123),
      /** Is file locked */
      isLock: t.withDefault(t.boolean, true),
    }),
  ])
);
