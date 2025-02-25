import * as actionTypes from '../ActionTypes'
import { GenderEnum, RoleEnum, User } from './type'

interface UserState {
  user: User
}

const initialState = {
  user: {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: 20,
    medicalCondition: [],
    gender: GenderEnum.Male,
    role: RoleEnum.User,
  } as User,
}

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      return { ...state, user: action.payload }
    case actionTypes.SIGN_OUT_USER:
      return initialState
    default:
      return state
  }
}
