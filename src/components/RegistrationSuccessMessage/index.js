import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const RegistrationSuccessMessage = () => {
  return (
    <div className="registration-success-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="registration-success-content-container">
        <p className="registration-success-text">Kiitos rekisteröitymisestä!</p>
        <p>
          Lähetimme sinulle sähköpostilla linkin, josta pääset kirjautumaan
          palveluun.
        </p>
        <div className="registration-info-content">
          <ol className="registration-info-list">
            <li>Avaa sähköposti.</li>
            <li>
              Olet saanut viestin, jossa on lähettäjänä &quot;Kohdataan&quot; ja
              aiheena &quot;Kirjautuminen&quot;.
            </li>
            <li>
              Kun klikkaat viestissä olevaa linkkiä, pääset palvelun
              kirjautumissivulle.
            </li>
            <li>
              Kirjoita sivulle sähköposti ja salasana, jonka annoit
              rekisteröitymisessä.
            </li>
            <li>Kun klikkaat &quot;Kirjaudu&quot;, olet palvelussa!</li>
          </ol>
          <p className="reminder-content-text,">
            Jos et löydä sähköpostistasi viestiä, muista tarkistaa myös
            roskapostikansio.
          </p>
        </div>
        <hr className="divider" />
        <div className="problems-with-registration-link-container">
          <Link
            className="problems-with-registration-link"
            to="/registrationproblem"
          >
            Tarvitsen apua rekisteröitymisessä
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(RegistrationSuccessMessage)
