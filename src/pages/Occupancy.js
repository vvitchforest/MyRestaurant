/**
 * @Author Oskar Wiiala
 * This is just a temporary page to view occupancy histogram. This will be deleted when bar chart is completed.
 */
import { React, useState } from 'react'
import { Container, Box } from '@mui/material'
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  VisualRange,
  Label,
  ConstantLine
} from 'devextreme-react/chart'
import { temperaturesData } from '../utils/OccupancyData.js'

const Occupancy = () => {
  const [highAverage] = useState(77)
  const [lowAverage] = useState(58)
  const currentHour = new Date().getHours()
  console.log(currentHour)

  const customizePoint = (arg) => {
    console.log(arg.data.day)
    if (arg.data.day === '12') {
      console.log('day 12')
      return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } }
    }
    if (arg.value < lowAverage) {
      return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } }
    }
    return null
  }

  return (
    <Container>
      <p>Occupancy histogram preview page. Delete later.</p>
      <Box sx={{ overflowX: 'auto' }}>
        <Chart
          id='chart'
          title='Occupancy histogram'
          dataSource={temperaturesData}
          customizePoint={customizePoint}
        >
          <Series
            argumentField='day'
            valueField='value'
            type='bar'
            color='#e7d19a'
          />
          <ValueAxis maxValueMargin={0.01}>
            <VisualRange startValue={40} />
            <ConstantLine
              width={2}
              value={lowAverage}
              color='#8c8cff'
              dashStyle='dash'
            >
              <Label text='Low Average' />
            </ConstantLine>
            <ConstantLine
              width={2}
              value={highAverage}
              color='#ff7c7c'
              dashStyle='dash'
            >
              <Label text='High Average' />
            </ConstantLine>
          </ValueAxis>
          <Legend visible={false} />
        </Chart>
      </Box>
    </Container>
  )
}

export default Occupancy
