import * as actionTypes from '../ActionTypes'
import { User } from '../User/type'
import { Schedule } from './type'

interface ScheduleState {
  schedules: Schedule[]
  // currentEditSchedule: Schedule
  currentSchedule: Partial<Schedule> | undefined
  admin: {
    schedules: Schedule[]
    patientList: { _id: string; user: User; schedules: Schedule[] }[]
  }
}

const initialState: ScheduleState = {
  schedules: [],
  currentSchedule: undefined,
  admin: {
    schedules: [],
    patientList: [],
  },
}

export const scheduleReducer = (state = initialState, action: any): ScheduleState => {
  switch (action.type) {
    case actionTypes.SET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      }
    case actionTypes.SET_CURRENT_SCHEDULE:
      return {
        ...state,
        currentSchedule: action.payload,
      }
    case actionTypes.ADD_SCHEDULE_TO_STORE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
      }
    case actionTypes.SET_ADMIN_PENDING_SCHEDULES:
      return {
        ...state,
        admin: {
          ...state.admin,
          schedules: action.payload,
        },
      }
    case actionTypes.SET_ADMIN_PATIENT_LIST:
      return {
        ...state,
        admin: {
          ...state.admin,
          patientList: action.payload,
        },
      }
    default:
      return state
  }
}
