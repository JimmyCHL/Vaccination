import { DateTime } from 'luxon'
import { Hospital } from '../Hospital/type'
import { User } from '../User/type'
import { Vaccine } from '../Vaccine/type'

// paid status enum
enum PaidStatusEnum {
  Paid = 'Paid',
  Refunded = 'Refunded',
}

// schedule enum
export enum ScheduleStatusEnum {
  Approved = 'Approved',
  Scheduled = 'Scheduled',
  Cancelled = 'Cancelled',
  Deny = 'Deny',
}

export type Schedule = {
  _id: string
  user: User
  vaccine: Vaccine
  hospital: Hospital
  dates: DateTime[]
  status: ScheduleStatusEnum
  paidStatus: PaidStatusEnum
  details: {
    curPrice: number
    doses: number
    totalAmount: number
  }
}
