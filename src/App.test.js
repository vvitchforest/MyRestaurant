/**
 * @Author Teemu Tirkkonen
 * Unit tests for the app are here
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
// import App from './App'
import RestaurantCard from './components/RestaurantCard'
import { renderWithProviders } from './utils/test-utils'
import DirectionsModal from './components/DirectionsModal'

/* // eslint-disable-next-line no-undef
test('renders MyRestaurant link', () => {
  renderWithProviders(<App />, {
    preloadedState: {
      cookie: 'en'
    }
  })
  const linkElement = screen.getByRole('link', { name: /MyRestaurant/ })
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument()
}) */
// eslint-disable-next-line no-undef
test('renders restaurant card', () => {
  const card = {
    key: 'hefguwhgjsdhgkjs',
    placeId: 'sfksdngksdnlsk',
    name: 'Test',
    address: 'Testing',
    icon: 'https://i.ibb.co/M2NLtMx/image-not-available-wide3.png',
    rating: 4,
    userRatingsTotal: 200,
    isOpen: 'open'
  }

  renderWithProviders(<RestaurantCard
            key={card.placeId}
            placeId={card.placeId}
            name={card.name}
            address={card.address}
            icon={card.icon}
            rating={card.rating}
            userRatingsTotal={card.userRatingsTotal}
            isOpen={card.isOpen}/>, {
    preloadedState: {
      expanded: false
    }
  })
  const name = screen.getByText('Test')
  const address = screen.getByText('Testing')
  // const rating = screen.getByText('Test')
  // eslint-disable-next-line no-undef
  expect(name).toBeDefined()
  // eslint-disable-next-line no-undef
  expect(address).toBeDefined()
})
// eslint-disable-next-line no-undef
test('renders DirectionsModal component', () => {
  function setOpenDrawer () {
    return false
  }
  function modalOpen () {
    return false
  }
  const modal = {
    open: false,
    handleClose: modalOpen,
    setOpenDrawer,
    currentPos: { lat: 45, lng: 31 },
    restaurantLat: 45,
    restaurantLng: 30,
    mapRef: {}
  }
  render(<DirectionsModal
  open={modal.open}
  handleClose={modal.handleClose}
  setOpenDrawer={modal.setOpenDrawer}
  currentPos={modal.currentPos}
  restaurantLat={modal.restaurantLat}
  restaurantLng={modal.restaurantLng}
  mapRef={modal.mapRef}
  />)
  const lat = screen.findByText('45')
  // eslint-disable-next-line no-undef
  expect(lat).toBeDefined()
})
