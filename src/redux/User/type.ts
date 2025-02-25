// a gender enum
export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

// a role enum
export enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  age: number
  profession?: string
  contact?: string
  address?: string
  gender: GenderEnum
  medicalCondition: string[]
  medicalCertificate?: string
  role: RoleEnum
}
