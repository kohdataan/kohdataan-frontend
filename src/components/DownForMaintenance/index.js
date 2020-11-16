import React, { memo, useEffect } from 'react'
import './styles.scss'

const DownForMaintenance = () => {
  useEffect(() => {
    localStorage.removeItem('userId')
    localStorage.removeItem('authToken')
  })

  return (
    <div className="account-locked-container">
      <h1 className="account-locked-text">Kohdataan</h1>
      <p className="account-locked-paragraph">
        Kohdataan-some on korjaustöiden takia poikkeuksellisesti kiinni.
      </p>
      <p className="account-locked-paragraph">
        Avaamme somen taas tiistaina 17.11.
      </p>
      <p className="account-locked-paragraph">Pahoittelut!</p>
    </div>
  )
}

export default memo(DownForMaintenance)
