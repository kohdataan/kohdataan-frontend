import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const VerificationInfo = () => {
  return (
    <main role="main" className="email-verification-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="email-verification-content-container">
        <h2 className="email-verification-title">
          Sähköpostin vahvistus linkki uudelleenlähetetty
        </h2>
        <div className="email-verification-input-container">
          <div className="email-verification-info-content">
            <ol className="email-verification-info-list">
              <li>Avaa sähköposti.</li>
              <li>
                Olet saanut viestin, jossa on lähettäjänä &quot;Kohdataan&quot;
                ja aiheena &quot;Kirjautuminen&quot;.
              </li>
              <li>
                Kun klikkaat viestissä olevaa linkkiä, vahvistat käyttäjäsi
              </li>
              <li>Kirjaudu tämän jälkeen sisään käyttäjälläsi</li>
            </ol>
            <p className="reminder-content-text">
              Jos et löydä sähköpostista viestiä, muista tarkistaa myös
              roskapostikansio.
            </p>
          </div>
          <div className="divider" aria-hidden="true" />
          <div className="email-verification-link-container">
            <Link className="email-verification-link" to="/login">
              Takaisin sisäänkirjautumiseen
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default memo(VerificationInfo)
