/**
 * @Author Teemu Tirkkonen
 * Function that's needed for unit tests if you want to test files that are using redux
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { setupStore } from './store'

export function renderWithProviders (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  Wrapper.propTypes = {
    children: PropTypes.any
  }
  function Wrapper ({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
