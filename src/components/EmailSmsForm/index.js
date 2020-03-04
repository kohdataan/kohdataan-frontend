import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

// This component needs a function that takes in an object that contains email and phonenumber,
// And then do something with this data. (send email with verification link, send password reset link, etc..)

const EmailSmsForm = props => {
  const { handleRequest, title, pagePurpose } = props
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="email-sms-form-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="email-sms-form-content-container">
        <h2 className="email-sms-form-title">{title}</h2>
        <p>Anna sähköpostiosoitteesi.</p>
        {pagePurpose === 'changePassword' ? (
          <p>
            Lähetämme sinulle linkin, josta pääset vaihtamaan unohtuneen
            salasanan.
          </p>
        ) : (
          <p>
            Lähetämme sinulle uudelleen linkin, josta pääset vahvistamaan
            sähköpostisi ja kirjautumaan sisään.
          </p>
        )}

        <div className="email-sms-form-input-container">
          <InputField
            label="Sähköposti"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="email-sms-form-input-text"
            labelClassName="email-sms-form-input-field"
            showPlaceholder={false}
          />
          <div className="hidden-field">
            <InputField
              label="Puhelinnumero"
              value={email}
              onChange={e => setPhoneNumber(e.target.value)}
              inputClassName="email-sms-form-input-text"
              labelClassName="email-sms-form-input-field"
              showPlaceholder={false}
            />
          </div>
          <ButtonContainer
            className="email-sms-form-button"
            onClick={() => handleRequest({ email, phoneNumber })}
          >
            Lähetä
          </ButtonContainer>

          <div className="email-sms-form-link-container">
            <Link className="email-sms-form-link" to="/registrationproblem">
              Tarvitsen apua kirjautumisessa.
            </Link>
            <Link className="email-sms-form-link" to="/login">
              Haluan kirjautua sisään.
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
  pagePurpose: PropTypes.string.isRequired,
}

export default memo(EmailSmsForm)
