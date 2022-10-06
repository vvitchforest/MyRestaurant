import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RestaurantsList from './pages/RestaurantsList'
import Map from './pages/Map'
import Menu from './pages/Menu'
import { LoadScript } from '@react-google-maps/api'

function App () {
  return (
    <Router>
      <Navbar />
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}/>
      <Routes>
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/map" element={<Map/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
