import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

// eslint-disable-next-line no-undef
test('renders MyRestaurant link', () => {
  render(<App />)
  const linkElement = screen.getByRole('link', { name: /MyRestaurant/ })
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument()
})
