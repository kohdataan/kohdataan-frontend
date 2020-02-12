import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

// This component needs a function that takes in an object that contains email and phonenumber,
// And then do something with this data. (send email with verification link, send password reset link, etc..)

const EmailSmsForm = props => {
  const { handleRequest, title, description } = props
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">{title}</h2>
        <p>Anna sähköpostiosoitteesi.</p>
        <p>{description}</p>

        <div className="password-reset-input-container">
          <InputField
            label="Sähköpostiosoite"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="password-reset-input-text"
            labelClassName="password-reset-input-field"
            showPlaceholder={false}
          />
          <div className="hidden-field">
            <InputField
              label="Puhelinnumero"
              value={email}
              onChange={e => setPhoneNumber(e.target.value)}
              inputClassName="password-reset-input-text"
              labelClassName="password-reset-input-field"
              showPlaceholder={false}
            />
          </div>
          <ButtonContainer
            className="password-reset-button"
            onClick={() => handleRequest({ email, phoneNumber })}
          >
            Lähetä
          </ButtonContainer>

          <div className="password-reset-link-container">
            <Link className="password-reset-link" to="/login">
              Takaisin sisäänkirjautumiseen
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

EmailSmsForm.propTypes = {
  handleRequest: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default memo(EmailSmsForm)
