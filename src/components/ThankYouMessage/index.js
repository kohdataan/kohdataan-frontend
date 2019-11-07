import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const ThankYouMessage = () => {
  return (
    <div className="thankyou-message-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="thankyou-message-content-container">
        <p className="registration-success-text">Kiitos viestistä.</p>
        <p>Vastaamme sinulle sähköpostilla mahdollisimman pian.</p>
        <div className="registration-problem-links-container">
          <Link className="registration-problem-link" to="/login">
            {'Olen vanha käyttäjä ja haluan kirjautua sisään.'}
          </Link>
          <Link className="registration-problem-link" to="/createaccount">
            {'Olen uusi käyttäjä ja haluan rekisteröityä.'}
          </Link>
          <Link className="registration-problem-link" to="/">
            {'Olen unohtanut salasanani.'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(ThankYouMessage)
