/**
 * @Author Oskar Wiiala
 * This is just a temporary page to view occupancy histogram. This will be deleted when bar chart is completed.
 */
import { React } from 'react'
import { BarChart } from 'react-d3-components'
import { Container, Box } from '@mui/material'

const Occupancy = () => {
  const currentHour = new Date().getHours()
  console.log(currentHour)

  //   const data = [
  //     {
  //       values: [
  //         { x: '1', y: 0 },
  //         { x: '2', y: 0 },
  //         { x: '3', y: 0 },
  //         { x: '4', y: 0 },
  //         { x: '5', y: 0 },
  //         { x: '6', y: 0 },
  //         { x: '7', y: 0 },
  //         { x: '8', y: 5 },
  //         { x: '9', y: 10 },
  //         { x: '10', y: 15 },
  //         { x: '11', y: 30 },
  //         { x: '12', y: 50 },
  //         { x: '13', y: 27 },
  //         { x: '14', y: 23 },
  //         { x: '15', y: 14 },
  //         { x: '16', y: 7 },
  //         { x: '17', y: 10 },
  //         { x: '18', y: 19 },
  //         { x: '19', y: 17 },
  //         { x: '20', y: 27 },
  //         { x: '21', y: 0 },
  //         { x: '22', y: 0 },
  //         { x: '23', y: 0 },
  //         { x: '24', y: 0 }
  //       ]
  //     }
  //   ]

  const data = {}
  data.values = [
    { x: '1', y: 0 },
    { x: '2', y: 0 },
    { x: '3', y: 0 },
    { x: '4', y: 0 },
    { x: '5', y: 0 },
    { x: '6', y: 0 },
    { x: '7', y: 0 },
    { x: '8', y: 5 },
    { x: '9', y: 10 },
    { x: '10', y: 15 },
    { x: '11', y: 30 },
    { x: '12', y: 50 },
    { x: '13', y: 27 },
    { x: '14', y: 23 },
    { x: '15', y: 14 },
    { x: '16', y: 7 },
    { x: '17', y: 10 },
    { x: '18', y: 19 },
    { x: '19', y: 17 },
    { x: '20', y: 27 },
    { x: '21', y: 0 },
    { x: '22', y: 0 },
    { x: '23', y: 0 },
    { x: '24', y: 0 }
  ]

  //   const data2 = [
  //     { label: 'one', values: [{ x: 'test1', y: 10 }] },
  //     { label: 'two', values: [{ x: 'test2', y: 20 }] },
  //     { label: 'three', values: [{ x: 'test3', y: 30 }] },
  //     { label: 'four', values: [{ x: 'test4', y: 20 }] },
  //     { label: 'five', values: [{ x: 'test5', y: 10 }] }
  //   ]

  //   console.log(data[0].values[11].x)

  data.fill = 'lemonChiffon'
  data.barClass = 'BarChart'
  data.color = 'lemonChiffon'
  console.log(data)

  return (
    <Container>
      <p>Occupancy histogram preview page. Delete later.</p>
      <Box sx={{ overflowX: 'auto' }}>
        <BarChart
          data={data}
          width={600}
          height={150}
          margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          colorByLabel={false}
          style={{ fill: 'lemonChiffon' }}
        />
      </Box>
    </Container>
  )
}
export default Occupancy
