/**
 * @Author Oskar Wiiala
 * This is just a temporary page to view occupancy histogram.
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
  ConstantLine,
  Size
} from 'devextreme-react/chart'
import { occupancyData } from '../utils/OccupancyData.js'

const Occupancy = () => {
  const [highAverage] = useState(40)
  const [lowAverage] = useState(15)
  const currentHour = new Date().getHours()
  console.log(currentHour)

  const customizePoint = (arg) => {
    console.log(arg.data.hour, arg.data.value)
    if (arg.data.hour === currentHour.toString()) {
      console.log('current hour')
      return { color: '#DA4949', hoverStyle: { color: '#DA4949' } }
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
          dataSource={occupancyData}
          customizePoint={customizePoint}
        >
          <Size height={150} />
          <Series
            argumentField='hour'
            valueField='value'
            type='bar'
            color='#1976D2'
          />
          <ValueAxis maxValueMargin={0.01}>
            <VisualRange startValue={0} />
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
