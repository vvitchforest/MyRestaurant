import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import userinterfaceReducer from './store/reducers/userinterface'
import { configureStore } from '@reduxjs/toolkit'
import CssBaseline from '@mui/material/CssBaseline'
import { ColorModeContextProvider } from './context/ColorModeContext'

const store = configureStore({
  reducer: {
    userinterface: userinterfaceReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ColorModeContextProvider>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
    </ColorModeContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
