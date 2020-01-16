import React, { memo } from 'react'
import './styles.scss'

const FullScreenLoading = () => {
  return (
    <div className="full-screen-loading">
      <h1 className="loading-text">Kohdataan</h1>
    </div>
  )
}

export default memo(FullScreenLoading)
