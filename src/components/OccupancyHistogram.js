/**
 * @Author Oskar Wiiala
 * Occupacy histogram component for thermal camera data to be used by Nokia restaurant.
 */

import { React, useState, useEffect } from 'react'
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  ArgumentAxis,
  VisualRange,
  Label,
  ConstantLine,
  CommonSeriesSettings,
  Size
} from 'devextreme-react/chart'
import { getOccupancyData } from '../utils/OccupancyData.js'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

// args should only contain width and height
const OccupancyHistogram = (args) => {
  const getCurrentTimeQuartered = () => {
    const date = new Date()
    const hour = date.getHours().toString()
    const minute = date.getMinutes()
    let convertedMinute = ''
    if (minute < 30 && minute >= 15) {
      convertedMinute = ':15'
    } else if (minute < 45 && minute >= 30) {
      convertedMinute = ':30'
    } else if (minute >= 45) {
      convertedMinute = ':45'
    }
    return hour + convertedMinute
  }

  const [cookies] = useCookies(['language'])
  const [highAverage] = useState(40)
  const [lowAverage] = useState(15)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const currentTimeQuarter = getCurrentTimeQuartered()

  useEffect(() => {
    console.log('occupancy histogram: ', args)
    setWidth(args.width ? args.width : 300)
    setHeight(args.height ? args.height : 150)
  })

  const getCurrentDay = () => {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]
    const d = new Date()
    return days[d.getDay()]
  }

  // Customizes actual value and prediction value color for bar when it is at current hour
  const customizePoint = (arg) => {
    console.log(
      'data time:',
      arg.data.time,
      'current time quartered:',
      currentTimeQuarter
    )
    if (arg.data.time === currentTimeQuarter) {
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
    <Chart
      id='chart'
      title='Occupancy histogram'
      dataSource={getOccupancyData(getCurrentDay())}
      customizePoint={customizePoint}
    >
      <Size width={width} height={height} />
      <CommonSeriesSettings
        argumentField='time'
        type='bar'
        barOverlapGroup='time'
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
  )
}

export default OccupancyHistogram
