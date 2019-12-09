import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const ResetInfo = () => {
  return (
    <main role="main" className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">Salasanan vaihtaminen</h2>
        <p>
          Lähetimme sinulle sähköpostilla linkin, josta pääset vaihtamaan
          salasanan.
        </p>

        <div className="password-reset-input-container">
          <div className="password-reset-info-content">
            <ol className="password-reset-info-list">
              <li>Avaa sähköposti.</li>
              <li>
                Olet saanut viestin, jossa on lähettäjänä &quot;Kohdataan&quot; ja
                aiheena &quot;Salasanan vaihtaminen&quot;.
              </li>
              <li>
                Kun klikkaat viestissä olevaa linkkiä, pääset sivulle, jossa
                voit vaihtaa salasanan.
              </li>
              <li>Anna sivulla uusi salasana.</li>
              <li>Kun klikkaat &quot;Kirjaudu&quot;, olet palvelussa!</li>
            </ol>
            <p className="reminder-content-text">
              Jos et löydä sähköpostista viestiä, muista tarkistaa myös
              roskapostikansio.
            </p>
          </div>
          <div className="divider" aria-hidden="true" />
          <div className="password-reset-link-container">
            <Link className="password-reset-link" to="/">
              {'Tarvitsen apua salasanan vaihtamisessa.'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default memo(ResetInfo)
