import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../../InputField'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const ResetRequest = props => {
  const { handleResetRequest } = props
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">Salasanan palautus</h2>
        <p>Anna sähköpostiosoitteesi.</p>
        <p>
          Lähetämme sinulle linkin, josta pääset vaihtamaan unohtuneen salasanan.
        </p>

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
            onClick={() => handleResetRequest({ email, phoneNumber })}
          >
            Lähetä
          </ButtonContainer>

          <div className="password-reset-link-container">
            <Link className="password-reset-link" to="/login">
              Olen vanha käyttäjä ja haluan kirjautua sisään
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ResetRequest.propTypes = {
  handleResetRequest: PropTypes.func.isRequired,
}

export default memo(ResetRequest)
