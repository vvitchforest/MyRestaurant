/**
 * @Author Teemu Tirkkonen
 * Functions for setting values to redux store
 */

import * as actionTypes from './actionTypes'

export const setLanguage = (cookie) => {
  return {
    type: actionTypes.SET_LANGUAGE,
    cookie
  }
}

export const setOpeningHours = (expanded) => {
  return {
    type: actionTypes.SET_OPENING_HOURS,
    expanded
  }
}

export const setPlaceId = (placeId) => {
  return {
    type: actionTypes.SET_PLACE_ID,
    placeId
  }
}
