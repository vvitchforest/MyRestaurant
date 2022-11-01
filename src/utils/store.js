import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '../store/reducers/userinterface'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  expanded: userReducer,
  cookie: userReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
