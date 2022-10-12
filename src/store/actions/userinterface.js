import * as actionTypes from './actionTypes'

export const setLanguage = (cookie) => {
  return {
    type: actionTypes.SET_LANGUAGE,
    cookie: cookie
  }
}
