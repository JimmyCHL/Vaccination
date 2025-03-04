import { RootState } from '../store'

export const hospitalsSelector = (store: RootState) => store.hospitalReducer.hospitals
