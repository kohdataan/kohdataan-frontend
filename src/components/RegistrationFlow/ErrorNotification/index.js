import React, { memo } from 'react'
import './styles.scss'

const ErrorNotification = (props) => {
  const { errorMessage } = props || null
  return (
    <div className="error-notification-container">
      <p>{errorMessage}</p>
    </div>
  )
}

export default memo(ErrorNotification)
