//this contains list of actions which will be used in reducers and action files
//constants are returned as action types which will be used in action and reducer files
// User actions
export const ADD_USER_TO_STORE = 'STORE.ADDUSER'
export const SIGN_OUT_USER = 'STORE.SIGNOUTUSER'

// Vaccine actions
export const ADD_VACCINE_TO_STORE = 'STORE.ADDVACCINE'
export const SET_VACCINES = 'STORE.SETVACCINES'

// Hospital actions
export const ADD_HOSPITAL_TO_STORE = 'STORE.ADDHOSPITAL'
export const SET_HOSPITALS = 'STORE.SETHOSPITALS'

// Schedule actions
export const ADD_SCHEDULE_TO_STORE = 'STORE.ADDSCHEDULE'
export const SET_SCHEDULES = 'STORE.SETSCHEDULES'
export const SET_CURRENT_SCHEDULE = 'STORE.SETCURRENTSCHEDULE'

// Admin actions
export const SET_ADMIN_PENDING_SCHEDULES = 'STORE.SETADMINPENDINGSCHEDULES'
export const SET_ADMIN_PATIENT_LIST = 'STORE.SETADMINPATIENTLIST'
