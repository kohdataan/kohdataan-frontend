import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const EmailSmsInfo = props => {
  const { description, guide } = props

  return (
    <main role="main" className="email-sms-info-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="email-sms-info-content-container">
        <h2 className="email-sms-info-title">Salasanan vaihtaminen</h2>
        <p>{description}</p>

        <div className="email-sms-info-input-container">
          <div className="email-sms-info-content">
            {guide}
            <p className="reminder-content-text">
              Jos et löydä sähköpostista viestiä, muista tarkistaa myös
              roskapostikansio.
            </p>
          </div>
          <div className="divider" aria-hidden="true" />
          <div className="registration-problem-link-container email-sms-info-link-container">
            <Link
              className="registration-problem-link"
              to="/registrationproblem"
            >
              Tarvitsen apua salasanan vaihtamisessa.
            </Link>
            <Link className="registration-problem-link" to="/login">
              Haluan kirjautua sisään.
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// PropTypes.element allows us to pass in jsx
EmailSmsInfo.propTypes = {
  description: PropTypes.string.isRequired,
  guide: PropTypes.element,
}

EmailSmsInfo.defaultProps = {
  guide: {},
}

export default memo(EmailSmsInfo)
