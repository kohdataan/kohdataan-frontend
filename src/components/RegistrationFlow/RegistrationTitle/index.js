import React, { memo } from 'react'
import './styles.scss'

const RegistrationTitle = () => {
  return (
    <div className="registration-title-container">
      <h1 className="registration-title">Kohdataan</h1>
    </div>
  )
}

export default memo(RegistrationTitle)
