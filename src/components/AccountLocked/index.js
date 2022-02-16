import React, { memo } from 'react'
import './styles.scss'

const AccountLocked = () => {
  return (
    <div className="account-locked-container">
      <h1 className="account-locked-text">Kohdataan</h1>
      <p className="account-locked-paragraph">
        Käyttäjätilisi on tällä hetkellä pois käytöstä.
      </p>
      <p className="account-locked-paragraph">
        Ota tarvittaessa yhteyttä osoitteeseen &nbsp;
        <a
          href="mailto:kohdataan@kohdataan.fi"
          className="account-locked-email-link"
        >
          kohdataan@kohdataan.fi.
        </a>
      </p>
      <p className="account-locked-paragraph">
        <a className="login-link" href="/login">
          Takaisin
        </a>
      </p>
    </div>
  )
}

export default memo(AccountLocked)
