// Create a enum
export enum HospitalEnum {
  Govt = 'Govt',
  Private = 'Private',
}

export type Hospital = {
  _id: string
  name: string
  imageUrl: string
  address: string
  type: HospitalEnum
  description: string
  charges: number
}
