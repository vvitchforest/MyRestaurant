/**
 * @Author Oskar Wiiala
 * This is just a temporary page to view occupancy histogram.
 */
// import { Container } from '@mui/system'
import { React } from 'react'
import OccupancyHistogram from '../components/OccupancyHistogram.js'

const Occupancy = () => {
  console.log('occupancy')
  return (
      <OccupancyHistogram width={300} height={150} />
  )
}

export default Occupancy
