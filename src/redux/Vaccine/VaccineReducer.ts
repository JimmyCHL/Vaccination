import * as actionTypes from '../ActionTypes'
import { Vaccine } from './type'

interface VaccineState {
  vaccines: Vaccine[]
}

const initialState: VaccineState = {
  vaccines: [],
}

export const vaccineReducer = (state = initialState, action: any): VaccineState => {
  switch (action.type) {
    case actionTypes.ADD_VACCINE_TO_STORE:
      return { ...state, vaccines: [...state.vaccines, action.payload] }
    case actionTypes.SET_VACCINES:
      return { ...state, vaccines: action.payload }
    default:
      return state
  }
}
