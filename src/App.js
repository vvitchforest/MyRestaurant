import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RestaurantsList from './pages/RestaurantsList'
import Map from './pages/Map'
import Menu from './pages/Menu'

function App () {
  console.log('appi')
  return (
    <Router>
      <Navbar />
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
