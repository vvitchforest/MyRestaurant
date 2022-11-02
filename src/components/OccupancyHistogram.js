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
  Size,
  AdaptiveLayout
} from 'devextreme-react/chart'
import { getOccupancyData } from '../utils/OccupancyData.js'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'

// args should only contain width and height
const OccupancyHistogram = (args) => {
  // Converts current time into 15 minute intervals rounded down (e.g. 12:42 -> 12:30, or 12:09 -> 12)
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
  const language = cookies.language ? cookies.language : 'en'
  const [highAverage] = useState(40)
  const [lowAverage] = useState(15)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const currentTimeQuartered = getCurrentTimeQuartered()

  useEffect(() => {
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
    // getDay() returns a number, which represents the day
    return days[d.getDay()]
  }

  // Customizes actual value and prediction value color for bar when it is at current hour
  const customizePoint = (arg) => {
    if (arg.data.time === currentTimeQuartered) {
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
      title={getTranslation(language, 'occupancy')}
      dataSource={getOccupancyData(getCurrentDay())}
      customizePoint={customizePoint}
    >
      <AdaptiveLayout width={0} height={0} keepLabels={true} />
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
      <ArgumentAxis title={getTranslation(language, 'hourofday')} />
      <ValueAxis title={getTranslation(language, 'people')}>
        <VisualRange startValue={0} />
        <ConstantLine
          width={2}
          value={lowAverage}
          color='#8c8cff'
          dashStyle='dash'
        >
          <Label text={getTranslation(language, 'lessbusy')} />
        </ConstantLine>
        <ConstantLine
          width={2}
          value={highAverage}
          color='#ff7c7c'
          dashStyle='dash'
        >
          <Label text={getTranslation(language, 'busy')} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}

export default OccupancyHistogram
