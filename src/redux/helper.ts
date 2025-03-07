import { DateTime } from 'luxon'
import { Schedule } from './Schedule/type'

export const unmarshalFields = <T extends { _id: string }>(data: T): T => {
  // @ts-ignore
  delete data.__v
  // @ts-ignore
  delete data.createdAt
  // @ts-ignore
  delete data.updatedAt

  return data
}

export const marshalSchedule = (schedule: Schedule): Object => {
  return {
    ...schedule,
    user: schedule.user._id,
    vaccine: schedule.vaccine._id,
    hospital: schedule.hospital._id,
  }
}

export const marshalDateTime = <T extends Object>(data: T): T => {
  Object.keys(data).forEach((key) => {
    // @ts-ignore
    if (data[key] instanceof DateTime) {
      // @ts-ignore
      data[key] = data[key].toISO() ?? DateTime.now().toISO()
    }
  })
  return data
}

export const unmarshalDateTime = <T extends Object>(data: T): T => {
  Object.keys(data).forEach((key) => {
    // @ts-ignore
    if (typeof data[key] === 'string' && DateTime.fromISO(data[key]).isValid) {
      // @ts-ignore
      data[key] = DateTime.fromISO(data[key])
    }
  })
  return data
}
