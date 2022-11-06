import React from 'react'
import PropTypes from 'prop-types'

/**
 * @Author Irina Konovalova
 * Component showing the content of a selected tab. Used in Home.
 * @param {node} children content of tab panel
 * @param {number} value selected tab
 * @param {number} index index of the current tab
 * @returns tab panel i.e. section showing content of one tab at a time
 */

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
