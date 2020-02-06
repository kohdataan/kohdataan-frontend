import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../../InputField'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EmailVerificationRequest = props => {
  const { handleVerifyRequest } = props
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="email-verification-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="email-verification-content-container">
        <h2 className="email-verification-title">
          Sähköposti vahvistuksen uudelleenlähetys
        </h2>
        <p>Anna sähköpostiosoitteesi.</p>
        <p>
          Lähetämme sinulle uuden linkin josta pystyt vahvistamaan sähköpostisi.
        </p>

        <div className="email-verification-input-container">
          <InputField
            label="Sähköpostiosoite"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="email-verification-input-text"
            labelClassName="email-verification-input-field"
            showPlaceholder={false}
          />
          <div className="hidden-field">
            <InputField
              label="Puhelinnumero"
              value={email}
              onChange={e => setPhoneNumber(e.target.value)}
              inputClassName="email-verification-input-text"
              labelClassName="email-verification-input-field"
              showPlaceholder={false}
            />
          </div>
          <ButtonContainer
            className="email-verification-button"
            onClick={() => handleVerifyRequest({ email, phoneNumber })}
          >
            Lähetä
          </ButtonContainer>

          <div className="email-verification-link-container">
            <Link className="email-verification-link" to="/login">
              Takaisin sisäänkirjautumiseen
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

EmailVerificationRequest.propTypes = {
  handleVerifyRequest: PropTypes.func.isRequired,
}

export default memo(EmailVerificationRequest)
