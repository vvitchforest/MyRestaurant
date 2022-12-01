import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RestaurantsList from './pages/RestaurantsList'
import Map from './pages/Map'

function App () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/restaurants" exact element={<RestaurantsList />} />
        <Route path="/map" exact element={<Map/>} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
