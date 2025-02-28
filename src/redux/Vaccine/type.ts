export type Vaccine = {
  _id: string
  name: string
  description: string
  type: string
  price: number
  sideEffects: string[]
  origin: string
  dosesRequired: number
  strainsCovered: string[]
  quantity: number
  imageUrl?: string
}
