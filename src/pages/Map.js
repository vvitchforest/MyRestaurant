import React from 'react'
//  import { Container } from '@mui/material'
import { GoogleMap } from '@react-google-maps/api'

const Map = () => {
  const mapStyles = {
    height: '95vh',
    width: '100%'
  }

  const defaultCenter = {
    lat: 60.2199174072532, lng: 24.757443753545
  }

  return (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
  )
}
export default Map
