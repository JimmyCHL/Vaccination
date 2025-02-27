import { Dispatch } from 'react'
import axiosInstance from '../../config/globalAxios'
import * as actionTypes from '../ActionTypes'
import { unmarshalFields } from '../helper'
import { RootState } from '../store'
import { Vaccine } from './type'

// add vaccine to the store
export const ADD_VACCINE_TO_STORE = (vaccine: Vaccine) => {
  return {
    type: actionTypes.ADD_VACCINE_TO_STORE,
    payload: vaccine,
  }
}

// set vaccine to the store
export const SET_VACCINES = (vaccines: Vaccine[]) => {
  return {
    type: actionTypes.SET_VACCINES,
    payload: vaccines,
  }
}

// save or update vaccine to the database
export const saveVaccine = (vaccine: Vaccine | (Omit<Vaccine, '_id'> & { _id?: string }), callback: () => void) => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .post(vaccine._id ? '/vaccine/api/updateVaccine' : '/vaccine/api/addVaccine', vaccine)
      .then((collection) => {
        const result = collection.data
        // if vaccine is updated, the result will be an array of vaccines with the updated vaccine
        if (vaccine._id) {
          dispatch(SET_VACCINES(result.map((vaccine: Vaccine) => unmarshalFields(vaccine))))
        } else {
          dispatch(ADD_VACCINE_TO_STORE(unmarshalFields(result)))
        }
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// delete vaccine from the database
export const deleteVaccine = (vaccine: Vaccine, callback: () => void) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    axiosInstance
      .delete(`/vaccine/api/deleteVaccine/${vaccine._id}`)
      .then(() => {
        const state = getState()
        const vaccines = state.vaccineReducer.vaccines.filter((v) => v._id !== vaccine._id)
        dispatch(SET_VACCINES(vaccines))
        callback?.()
      })
      .catch((error) => console.log(error))
  }
}

// fetch all vaccines from the database
export const fetchVaccines = () => {
  return (dispatch: Dispatch<any>) => {
    axiosInstance
      .get('/vaccine/api/fetchVaccines')
      .then((collection) => {
        const result = collection.data
        dispatch(SET_VACCINES(result.map((vaccine: Vaccine) => unmarshalFields(vaccine))))
      })
      .catch((error) => console.log(error))
  }
}
