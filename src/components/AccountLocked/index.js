import React, { memo, useEffect } from 'react'
import './styles.scss'

const AccountLocked = () => {
  useEffect(() => {
    localStorage.removeItem('userId')
    localStorage.removeItem('authToken')
  })

  return (
    <div className="account-locked-container">
      <h1 className="account-locked-text">Kohdataan</h1>
      <h3>
        Käyttäjätilisi on tällä hetkellä pois käytöstä. Voit ottaa tarvittaessa
        yhteyttä osoitteeseen{' '}
        <a href="mailto:kohdataan@kohdataan.fi">kohdataan@kohdataan.fi.</a>
      </h3>
    </div>
  )
}

export default memo(AccountLocked)
