/**
 * @Author Oskar Wiiala
 * Occupacy histogram component for thermal camera data to be used by Nokia restaurant.
 */

import { React, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  ArgumentAxis,
  VisualRange,
  Label,
  ConstantLine,
  Size,
  CommonSeriesSettings
} from 'devextreme-react/chart'
import { occupancyData } from '../utils/OccupancyData.js'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

// args should only contain width and height
const OccupancyHistogram = (args) => {
  const [cookies] = useCookies(['language'])
  const [highAverage] = useState(40)
  const [lowAverage] = useState(15)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const currentHour = new Date().getHours()

  useEffect(() => {
    console.log('occupancy histogram: ', args)
    setWidth(args.width ? args.width : 300)
    setHeight(args.height ? args.height : 150)
  })

  // Customizes actual value and prediction value color for bar when it is at current hour
  const customizePoint = (arg) => {
    if (arg.data.hour === currentHour.toString()) {
      // Series 1 pertains to actual value
      if (arg.seriesName === 'Series 1') {
        return {
          color: '#DA4949',
          hoverStyle: { color: '#DA4949' }
        }
      }
      // Series 2 pertains to prediction value
      if (arg.seriesName === 'Series 2') {
        return {
          color: '#DA49494D',
          hoverStyle: { color: '#DA4949' }
        }
      }
    }
    return null
  }

  return (
    <Box sx={{ overflowX: 'auto', padding: '20px' }}>
      <Chart
        id='chart'
        title='Occupancy histogram'
        dataSource={occupancyData}
        customizePoint={customizePoint}
      >
        <Size width={width} height={height} />
        <CommonSeriesSettings
          argumentField='hour'
          type='bar'
          barOverlapGroup='hour'
        />
        <Series id='seriesActual' valueField='valueActual' color='#1976D2' />
        <Series
          id='seriesPrediction'
          valueField='valuePrediction'
          color='#1976D24D'
        />
        <ArgumentAxis
          title={getTranslation(
            cookies.language ? cookies.language : 'en',
            'hourofday'
          )}
        />
        <ValueAxis
          title={getTranslation(
            cookies.language ? cookies.language : 'en',
            'people'
          )}
        >
          <VisualRange startValue={0} />
          <ConstantLine
            width={2}
            value={lowAverage}
            color='#8c8cff'
            dashStyle='dash'
          >
            <Label
              text={getTranslation(
                cookies.language ? cookies.language : 'en',
                'lowaverage'
              )}
            />
          </ConstantLine>
          <ConstantLine
            width={2}
            value={highAverage}
            color='#ff7c7c'
            dashStyle='dash'
          >
            <Label
              text={getTranslation(
                cookies.language ? cookies.language : 'en',
                'highaverage'
              )}
            />
          </ConstantLine>
        </ValueAxis>
        <Legend visible={false} />
      </Chart>
    </Box>
  )
}

export default OccupancyHistogram
