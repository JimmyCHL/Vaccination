import * as actionTypes from '../ActionTypes'
import { Hospital } from './type'

interface HospitalState {
  hospitals: Hospital[]
}

const initialState: HospitalState = {
  hospitals: [],
}

export const hospitalReducer = (state = initialState, action: any): HospitalState => {
  switch (action.type) {
    case actionTypes.ADD_HOSPITAL_TO_STORE:
      return { ...state, hospitals: [...state.hospitals, action.payload] }
    case actionTypes.SET_HOSPITALS:
      return { ...state, hospitals: action.payload }
    default:
      return state
  }
}
