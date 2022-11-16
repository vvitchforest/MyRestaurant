/**
 * @Author Teemu Tirkkonen
 * ActionTypes for redux so redux knows what to set based on the type
 */

import * as actionTypes from '../actions/actionTypes'

const initialState = {
  cookie: 'en',
  expanded: false,
  restaurants: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE: {
      return {
        ...state,
        cookie: action.cookie
      }
    }

    case actionTypes.SET_OPENING_HOURS: {
      return {
        ...state,
        expanded: action.expanded
      }
    }

    case actionTypes.SET_PLACE_ID: {
      return {
        ...state,
        placeId: action.placeId
      }
    }

    case actionTypes.SET_RESTAURANTS: {
      return {
        ...state,
        restaurants: action.restaurants
      }
    }

    default:
      return state
  }
}

export default reducer
