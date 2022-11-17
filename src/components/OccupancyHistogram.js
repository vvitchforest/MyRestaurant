/**
 * @Author Oskar Wiiala
 * Occupacy histogram component for thermal camera data to be used by Nokia restaurant.
 */

import { React, useState, useEffect, useContext } from 'react'
import {
  Chart,
  Title,
  Font,
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
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'

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
  const { mode } = useContext(ColorModeContext)

  useEffect(() => {
    setWidth(args.width ? args.width : 300)
    setHeight(args.height ? args.height : 150)
  }, [args.width])

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

  const [occupancyData, setOccupancyData] = useState([])
  useEffect(() => {
    setOccupancyData(getOccupancyData(getCurrentDay()))
  }, [])

  // Customizes actual value and prediction value color for bar when it is at current hour
  const customizePoint = (arg) => {
    if (arg.data.time === currentTimeQuartered) {
      console.log('arg:', arg)
      // Series 1 pertains to prediction value, // Series 2 pertains to actual value
      if (arg.seriesName === 'Series 1') {
        return {
          color: getDesignTokens(mode).palette.error.main,
          hoverStyle: getDesignTokens(mode).palette.error.dark
        }
      } else if (arg.seriesName === 'Series 2') {
        return {
          color: getDesignTokens(mode).palette.error.main,
          hoverStyle: getDesignTokens(mode).palette.error.dark
        }
      }
    }
    return null
  }

  return (
    <Chart
      id='chart'
      dataSource={occupancyData}
      customizePoint={customizePoint}
    >
      <Title text={getTranslation(language, 'occupancy')}>
        <Font color={getDesignTokens(mode).palette.text.primary} family='Fira Sans' size='1.25rem'>
        </Font>
      </Title>
      <AdaptiveLayout width={0} height={0} keepLabels={true} />
      <Size width={width} height={height} />
      <CommonSeriesSettings
        argumentField='time'
        type='bar'
        barOverlapGroup='time'
      />
      <Series id='seriesActual' valueField='valueActual' color={getDesignTokens(mode).palette.info.main} />
      <Series
        id='seriesPrediction'
        valueField='valuePrediction'
        color={getDesignTokens(mode).palette.info.main}
      />
      <ArgumentAxis>
        <Title text={getTranslation(language, 'hourofday')}>
          <Font color={getDesignTokens(mode).palette.text.secondary} family='Montserrat'>
          </Font>
        </Title>
      </ArgumentAxis>
      <ValueAxis>
        <Title text={getTranslation(language, 'people')}>
          <Font color={getDesignTokens(mode).palette.text.secondary} family='Montserrat'>
          </Font>
        </Title>
        <VisualRange startValue={0} />
        <ConstantLine
          width={2}
          value={lowAverage}
          color='#8c8cff'
          dashStyle='dash'
        >
          <Label text={getTranslation(language, 'lessbusy')}>
            <Font color={getDesignTokens(mode).palette.text.secondary} family='Montserrat'></Font>
          </Label>
        </ConstantLine>
        <ConstantLine
          width={2}
          value={highAverage}
          color='#ff7c7c'
          dashStyle='dash'
        >
           <Label text={getTranslation(language, 'busy')}>
            <Font color={getDesignTokens(mode).palette.text.secondary} family='Montserrat'></Font>
          </Label>
        </ConstantLine>
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}

export default OccupancyHistogram
