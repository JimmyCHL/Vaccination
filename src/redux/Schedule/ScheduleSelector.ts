import deepClone from 'deep-clone'
import { unmarshalDateTime } from '../helper'
import { RootState } from '../store'
import { User } from '../User/type'
import { Schedule } from './type'

export const schedulesSelector = (store: RootState) =>
  //@ts-expect-error
  deepClone(store.scheduleReducer?.schedules).map(unmarshalDateTime) as Schedule[]
export const scheduleSelector = (store: RootState) =>
  store.scheduleReducer?.currentSchedule ? unmarshalDateTime({ ...store.scheduleReducer.currentSchedule }) : undefined

export const adminSchedulesSelector = (store: RootState) =>
  //@ts-expect-error
  deepClone(store.scheduleReducer?.admin.schedules).map(unmarshalDateTime) as Schedule[]

export const adminPatientListSelector = (store: RootState) => {
  //@ts-expect-error
  const data = deepClone(store.scheduleReducer?.admin.patientList) as {
    _id: string
    user: User
    schedules: Schedule[]
  }[]

  return data.map((item) => ({
    ...item,
    schedules: item.schedules.map(unmarshalDateTime),
  }))
}
