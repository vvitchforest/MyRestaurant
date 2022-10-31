import React from 'react'
import PropTypes from 'prop-types'

const TabPanel = ({ children, value, index }) => {
  return (
    <div>
      {value === index && (<div> {children} </div>)}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export default TabPanel
