import { Dispatch } from 'react'
import axiosInstance from '../../config/globalAxios'
import * as actionTypes from '../ActionTypes'
import { marshalDateTime, marshalSchedule, unmarshalFields } from '../helper'
import { User } from '../User/type'
import { Schedule, ScheduleStatusEnum } from './type'

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
    const marshaledSchedule = marshalSchedule(schedule)
    // @ts-ignore
    delete marshaledSchedule._id

    axiosInstance
      .post('/schedule/api/saveSchedule', marshaledSchedule)
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

// fetch all Schedules from the database by userId
export const fetchSchedulesByUserId = (userId: string) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post('/schedule/api/getSchedulesByUserId', { userId })
      .then((collection) => {
        const result = collection.data
        dispatch(SET_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
      })
      .catch((error) => console.log(error))
  }
}

/** Admin */

// set admin pending schedules
export const SET_ADMIN_PENDING_SCHEDULES = (schedules: Schedule[]) => {
  return {
    type: actionTypes.SET_ADMIN_PENDING_SCHEDULES,
    payload: schedules.map(marshalDateTime),
  }
}

// set admin patient list
export const SET_ADMIN_PATIENT_LIST = (patientList: { _id: string; user: User; schedules: Schedule[] }[]) => {
  return {
    type: actionTypes.SET_ADMIN_PATIENT_LIST,
    payload: patientList,
  }
}

// fetch all schedules from the database for Admin
export const fetchAdminSchedules = () => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .get('/schedule/api/admin/getAdminSchedules')
      .then((collection) => {
        const result = collection.data
        dispatch(SET_ADMIN_PENDING_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
      })
      .catch((error) => console.log(error))
  }
}

// approve or deny schedule from the database
export const approveOrDenySchedule = (schedule: Schedule, status: ScheduleStatusEnum, callback?: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post('/schedule/api/admin/approveOrDenySchedule', { schedule, status })
      .then((collection) => {
        const result = collection.data
        dispatch(SET_ADMIN_PENDING_SCHEDULES(result.map((schedule: Schedule) => unmarshalFields(schedule))))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

export const getAdminPatientList = () => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .get('/schedule/api/admin/patientList')
      .then((collection) => {
        const result = collection.data

        const newResult = result.map((patient: any) => {
          return {
            ...patient,
            user: unmarshalFields(patient.user),
            schedules: patient.schedules.map((schedule: Schedule) => unmarshalFields(schedule)),
          }
        })

        dispatch(SET_ADMIN_PATIENT_LIST(newResult))
      })
      .catch((error) => console.log(error))
  }
}
