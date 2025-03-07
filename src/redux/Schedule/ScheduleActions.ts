import { Dispatch } from 'react'
import axiosInstance from '../../config/globalAxios'
import * as actionTypes from '../ActionTypes'
import { marshalDateTime, marshalSchedule, unmarshalFields } from '../helper'
import { Schedule } from './type'

// add schedule to the store
export const ADD_SCHEDULE_TO_STORE = (schedule: Schedule) => {
  return {
    type: actionTypes.ADD_SCHEDULE_TO_STORE,
    payload: marshalDateTime(schedule),
  }
}

// set schedule to the store
export const SET_SCHEDULES = (schedules: Schedule[]) => {
  return {
    type: actionTypes.SET_SCHEDULES,
    payload: schedules.map(marshalDateTime),
  }
}

// set current schedule to the store
export const SET_CURRENT_SCHEDULE = (schedule: Partial<Schedule> | undefined) => {
  return {
    type: actionTypes.SET_CURRENT_SCHEDULE,
    payload: schedule ? marshalDateTime(schedule) : undefined,
  }
}

// save schedule to the database
export const saveSchedule = (schedule: Schedule, callback: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post('/schedule/api/saveSchedule', marshalSchedule(schedule))
      .then((collection) => {
        const result = collection.data
        dispatch(SET_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// cancel schedule from the database
export const cancelSchedule = (schedule: Schedule, callback: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post('/schedule/api/cancelSchedule', schedule)
      .then((collection) => {
        const result = collection.data
        dispatch(SET_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// fetch all Schedules from the database
export const fetchSchedules = () => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .get('/schedule/api/getSchedules')
      .then((collection) => {
        const result = collection.data
        dispatch(SET_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
      })
      .catch((error) => console.log(error))
  }
}
