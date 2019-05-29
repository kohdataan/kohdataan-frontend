import React, { memo } from 'react'
import './styles.scss'

const InfoPage = () => {
  return (
    <p className="registration-info-page">
      Jotta muut voivat tutustua sinuun, kysymme muutaman kysymyksen
    </p>
  )
}

export default memo(InfoPage)
