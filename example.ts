
type Booking implements Node {
    id: ID!
    createdAt: DateTime!
    bookee(where: UserWhereInput): User!
    place(where: PlaceWhereInput): Place!
    startDate: DateTime!
    endDate: DateTime!
    payment(where: PaymentWhereInput): Payment!
  }

export interface BookingWhereInput {
    AND?: BookingWhereInput[] | BookingWhereInput
    OR?: BookingWhereInput[] | BookingWhereInput
    id?: ID_Input
    id_not?: ID_Input
    id_in?: ID_Input[] | ID_Input
    id_not_in?: ID_Input[] | ID_Input
    id_lt?: ID_Input
    id_lte?: ID_Input
    id_gt?: ID_Input
    id_gte?: ID_Input
    id_contains?: ID_Input
    id_not_contains?: ID_Input
    id_starts_with?: ID_Input
    id_not_starts_with?: ID_Input
    id_ends_with?: ID_Input
    id_not_ends_with?: ID_Input
    createdAt?: DateTime
    createdAt_not?: DateTime
    createdAt_in?: DateTime[] | DateTime
    createdAt_not_in?: DateTime[] | DateTime
    createdAt_lt?: DateTime
    createdAt_lte?: DateTime
    createdAt_gt?: DateTime
    createdAt_gte?: DateTime
    startDate?: DateTime
    startDate_not?: DateTime
    startDate_in?: DateTime[] | DateTime
    startDate_not_in?: DateTime[] | DateTime
    startDate_lt?: DateTime
    startDate_lte?: DateTime
    startDate_gt?: DateTime
    startDate_gte?: DateTime
    endDate?: DateTime
    endDate_not?: DateTime
    endDate_in?: DateTime[] | DateTime
    endDate_not_in?: DateTime[] | DateTime
    endDate_lt?: DateTime
    endDate_lte?: DateTime
    endDate_gt?: DateTime
    endDate_gte?: DateTime
    bookee?: UserWhereInput
    place?: PlaceWhereInput
    payment?: PaymentWhereInput
  }

  input BookingWhereInput {
    AND: [BookingWhereInput!]
    OR: [BookingWhereInput!]
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    startDate: DateTime
    startDate_not: DateTime
    startDate_in: [DateTime!]
    startDate_not_in: [DateTime!]
    startDate_lt: DateTime
    startDate_lte: DateTime
    startDate_gt: DateTime
    startDate_gte: DateTime
    endDate: DateTime
    endDate_not: DateTime
    endDate_in: [DateTime!]
    endDate_not_in: [DateTime!]
    endDate_lt: DateTime
    endDate_lte: DateTime
    endDate_gt: DateTime
    endDate_gte: DateTime
    bookee: UserWhereInput
    place: PlaceWhereInput
    payment: PaymentWhereInput
  }