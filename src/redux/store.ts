import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { hospitalReducer } from './Hospital/HospitalReducer'
import { scheduleReducer } from './Schedule/ScheduleReducer'
import { userReducer } from './User/UserReducer'
import { vaccineReducer } from './Vaccine/VaccineReducer'

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // key to store in localStorage (or any storage)
  storage, // use localStorage by default
  whitelist: ['userReducer', 'vaccineReducer', 'hospitalReducer', 'scheduleReducer'], // optional: only persist specific reducers
  blacklist: [], // optional: prevent persisting specific reducers
}

//we can add multiple reducers and combine them together to have one root reducer and add it to store
let rootReducer = combineReducers({
  userReducer,
  vaccineReducer,
  hospitalReducer,
  scheduleReducer,
})

// Persisted reducer that wraps the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//create or configure and export the store from this code
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore the persist/PERSIST action for serializability check
      },
    }),
})

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// Create persistor object
export const persistor = persistStore(store)
