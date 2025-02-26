export const unmarshalFields = <T extends { _id: string }>(data: T): T => {
  // @ts-ignore
  delete data.__v
  // @ts-ignore
  delete data.createdAt
  // @ts-ignore
  delete data.updatedAt

  return data
}
