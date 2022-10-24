/**
 * @Author Oskar Wiiala
 * Occupacy histogram component for thermal camera data to be used by Nokia restaurant.
 */

import { React, useState } from 'react'
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  ArgumentAxis,
  VisualRange,
  Label,
  ConstantLine,
  CommonSeriesSettings
} from 'devextreme-react/chart'
import { occupancyData } from '../utils/OccupancyData.js'
import { useCookies } from 'react-cookie'
import getTranslation from '../utils/Translations'
import ResponsiveBox, { Row } from 'devextreme-react/responsive-box'

// args should only contain width and height
const OccupancyHistogram = (args) => {
  const [cookies] = useCookies(['language'])
  const [highAverage] = useState(40)
  const [lowAverage] = useState(15)
  const currentHour = new Date().getHours()

  function screen (width) {
    console.log('width: ', width, args.width)
    return width < 700 ? 'sm' : 'lg'
  }

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
    <ResponsiveBox singleColumnScreen='sm' screenByWidth={screen}>
      <Row ratio={1}>
      <Chart
        id='chart'
        title='Occupancy histogram'
        dataSource={occupancyData}
        customizePoint={customizePoint}
      >
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
      </Row>
    </ResponsiveBox>
  )
}

export default OccupancyHistogram
