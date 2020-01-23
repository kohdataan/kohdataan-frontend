import React, { memo } from 'react'
import { Instagram } from 'react-content-loader'
import './styles.scss'

const PlaceholderLoader = () => {
  return <Instagram />
}

export default memo(PlaceholderLoader)
