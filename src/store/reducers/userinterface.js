import * as actionTypes from '../actions/actionTypes'

const initialState = {
  cookie: 'en'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE: {
      return {
        ...state,
        cookie: action.cookie
      }
    }

    default:
      return state
  }
}

export default reducer
