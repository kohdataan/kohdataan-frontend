import React, { memo } from 'react'
import './styles.scss'

const InfoPage = () => {
  return (
    <div className="registration-info-container ">
      <h2 className="registration-description">
        Tervetuloa tutustumaan uusiin ihmisiin!
      </h2>

      <div className="registration-info-text-container">
        <p className="registration-info-text">
          Kysymme muutaman kysymyksen, jotta muut voivat tutustua sinuun. Voit
          muokata kaikkia vastauksia myöhemmin omassa profiilissa.
        </p>
      </div>
    </div>
  )
}

export default memo(InfoPage)
