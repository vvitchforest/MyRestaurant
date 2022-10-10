import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RestaurantsList from './pages/RestaurantsList'
import Map from './pages/Map'
import Menu from './pages/Menu'
import Occupancy from './pages/Occupancy'

function App () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/map" element={<Map/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/" element={<Home />} />
        <Route path="/occupancy" element={<Occupancy />} />
      </Routes>
    </Router>
  )
}

export default App
