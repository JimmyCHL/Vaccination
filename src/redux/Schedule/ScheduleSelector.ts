import { unmarshalDateTime } from '../helper'
import { RootState } from '../store'

export const schedulesSelector = (store: RootState) => store.scheduleReducer?.schedules.map(unmarshalDateTime)
export const scheduleSelector = (store: RootState) =>
  store.scheduleReducer?.currentSchedule ? unmarshalDateTime({ ...store.scheduleReducer.currentSchedule }) : undefined
