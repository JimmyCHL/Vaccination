import { Dispatch } from 'react'
import axiosInstance from '../../config/globalAxios'
import * as actionTypes from '../ActionTypes'
import { unmarshalFields } from '../helper'
import { RootState } from '../store'
import { Hospital } from './type'

// add hospital to the store
export const ADD_HOSPITAL_TO_STORE = (hospital: Hospital) => {
  return {
    type: actionTypes.ADD_HOSPITAL_TO_STORE,
    payload: hospital,
  }
}

// set hospital to the store
export const SET_HOSPITALS = (hospitals: Hospital[]) => {
  return {
    type: actionTypes.SET_HOSPITALS,
    payload: hospitals,
  }
}

// save or update hospital to the database
export const saveHospital = (hospital: Hospital | (Omit<Hospital, '_id'> & { _id?: string }), callback: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post(hospital._id ? '/hospital/api/updateHospital' : '/hospital/api/addHospital', hospital)
      .then((collection) => {
        const result = collection.data
        // if hospital is updated, the result will be an array of hospitals with the updated hospital
        if (hospital._id) {
          dispatch(SET_HOSPITALS(result.map((hospital: Hospital) => unmarshalFields(hospital))))
        } else {
          dispatch(ADD_HOSPITAL_TO_STORE(unmarshalFields(result)))
        }
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// delete hospital from the database
export const deleteHospital = (hospital: Hospital, callback: () => void) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    axiosInstance
      .delete(`/hospital/api/deleteHospital/${hospital._id}`)
      .then(() => {
        const state = getState()
        const hospitals = state.hospitalReducer.hospitals.filter((h) => h._id !== hospital._id)
        dispatch(SET_HOSPITALS(hospitals))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// fetch all hospitals from the database
export const fetchHospitals = () => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .get('/hospital/api/fetchHospitals')
      .then((collection) => {
        const result = collection.data
        dispatch(SET_HOSPITALS(result.map((hospital: Hospital) => unmarshalFields(hospital))))
      })
      .catch((error) => console.log(error))
  }
}
