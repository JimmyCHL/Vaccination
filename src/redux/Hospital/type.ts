// Create a enum
enum HospitalEnum {
  Govt = 'Govt',
  Private = 'Private',
}

export type Hospital = {
  _id: string
  name: string
  imageUrl: string
  address: string
  type: HospitalEnum
  charges: number
}
