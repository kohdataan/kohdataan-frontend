import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles.scss'

const EmailSmsInfo = props => {
  const { title, description, guide } = props

  return (
    <main role="main" className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">{title}</h2>
        <p>{description}</p>

        <div className="password-reset-input-container">
          <div className="password-reset-info-content">
            {guide}
            <p className="reminder-content-text">
              Jos et löydä sähköpostista viestiä, muista tarkistaa myös
              roskapostikansio.
            </p>
          </div>
          <div className="divider" aria-hidden="true" />
          <div className="password-reset-link-container">
            <Link className="password-reset-link" to="/">
              Takaisin sisäänkirjautumiseen
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// PropTypes.element allows us to pass in jsx
EmailSmsInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  guide: PropTypes.element,
}

EmailSmsInfo.defaultProps = {
  guide: {},
}

export default memo(EmailSmsInfo)
