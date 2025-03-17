import { Dispatch } from 'react'
import axiosInstance from '../../config/globalAxios'
import * as actionTypes from '../ActionTypes'
import { unmarshalFields } from '../helper'
import {
  fetchAdminSchedules,
  fetchSchedulesByUserId,
  getAdminPatientList,
  SET_ADMIN_PATIENT_LIST,
  SET_ADMIN_PENDING_SCHEDULES,
  SET_CURRENT_SCHEDULE,
  SET_SCHEDULES,
} from '../Schedule/ScheduleActions'
import { User } from './type'

export type AuthenticateData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

//action accepts payload value/object to be used in user reducer switch
export const AddUserToStore = (user: AuthenticateData) => {
  return {
    type: actionTypes.ADD_USER_TO_STORE,
    payload: user,
  }
}

export const SignOutUser = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: actionTypes.SIGN_OUT_USER,
    })

    //clear current edited schedule while signout
    dispatch(SET_CURRENT_SCHEDULE(undefined))

    //Remove own schedules while signout
    dispatch(SET_SCHEDULES([]))

    //Remove admin schedules while signout
    dispatch(SET_ADMIN_PENDING_SCHEDULES([]))

    //Remove admin patient list while signout
    dispatch(SET_ADMIN_PATIENT_LIST([]))

    //Remove token while signout
    localStorage.removeItem('token')
  }
}

export const saveUser = (userObj: AuthenticateData, callback: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post(
        '/user/api/authenticate',
        userObj // the user state object we dispatch from the user component
      )
      .then((collection) => {
        //if user is not found or error while fetching existing user or error while sign up, we just sign out the user directly
        if (collection.data === 'Error while fetching existing user' || collection.data === 'error while sign up') {
          return dispatch(SignOutUser())
        }

        const { user, token } = collection.data

        /** fetch logic */
        if (user.role === 'Admin') {
          //fetch all pending schedules of the admin after successful login
          dispatch(fetchAdminSchedules())
          //fetch patient list of the admin after successful login
          dispatch(getAdminPatientList())
        } else {
          //fetch schedules of the user after successful login
          dispatch(fetchSchedulesByUserId(user._id))
        }

        //set token to local storage
        localStorage.setItem('token', token)

        dispatch(AddUserToStore(user))
        callback()
      })
      .catch((error) => console.log(error))
  }
}

export const updateUser = (userObj: User, callback?: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .put('/user/api/updateUser', userObj)
      .then((collection) => {
        const user = collection.data

        dispatch(AddUserToStore(unmarshalFields(user)))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}
