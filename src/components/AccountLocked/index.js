import React, { memo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../ButtonContainer'
import './styles.scss'

const AccountLocked = () => {
  const history = useHistory()
  const goToLogin = () => {
    history.push('/login')
    history.go()
  }

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
      <div className="login-links-container">
        <Button className="login-link login-link-button" onClick={goToLogin}>
          Kirjautumissivulle.
        </Button>
      </div>
    </div>
  )
}

export default memo(AccountLocked)
