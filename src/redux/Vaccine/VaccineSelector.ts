import { RootState } from '../store'

export const vaccinesSelector = (store: RootState) => store.vaccineReducer.vaccines
