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
      <p className="account-locked-paragraph">
        Käyttäjätilisi on tällä hetkellä pois käytöstä.
      </p>
      <p className="account-locked-paragraph">
        Ota tarvittaessa yhteyttä osoitteeseen{' '}
        <a
          href="mailto:kohdataan@kohdataan.fi"
          className="account-locked-email-link"
        >
          kohdataan@kohdataan.fi.
        </a>
      </p>
    </div>
  )
}

export default memo(AccountLocked)
