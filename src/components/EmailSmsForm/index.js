import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { Link } from 'react-router-dom'
import ValidatedInputField from '../ValidatedInputField'
import './styles.scss'

// This component needs a function that takes in an object that contains email and phonenumber,
// And then do something with this data. (send email with verification link, send password reset link, etc..)

const EmailSmsForm = props => {
  const { title, pagePurpose, handleRequest, apiError } = props
  const [phoneNumber, setPhoneNumber] = useState('')
  const { register, handleSubmit, errors, setError, clearError } = useForm()

  useEffect(() => {
    const setApiErrors = () => {
      if (apiError) setError('email', 'loginError')
    }
    setApiErrors()
  }, [apiError])

  const onSubmit = async data => {
    await handleRequest(data.email.trim().toLowerCase())
  }

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
          <form
            className="email-sms-input-fields-container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="formfield-container">
              <ValidatedInputField
                label="Sähköposti"
                name="email"
                ref={register({
                  required: true,
                })}
                ariaInvalid={!!errors.email}
                onChange={() => clearError()}
                inputClassName="email-sms-form-input-text"
                labelClassName="email-sms-form-input-field"
                showPlaceholder={false}
              />
              <div className="error-text">
                {errors.email &&
                  errors.email.type === 'required' &&
                  'Kirjoita sähköpostiosoite.'}
                {errors.email &&
                  errors.email.type === 'loginError' &&
                  'Tarkista sähköposti.'}
              </div>
            </div>
            <div className="hidden-field">
              <ValidatedInputField
                label="Puhelinnumero"
                value={phoneNumber}
                name="phoneNumber"
                onChange={e => setPhoneNumber(e.target.value)}
                inputClassName="email-sms-form-input-text"
                labelClassName="email-sms-form-input-field"
                showPlaceholder={false}
              />
            </div>
            <button
              type="submit"
              className="email-sms-form-button"
              onClick={handleSubmit(onSubmit)}
            >
              Lähetä
            </button>
          </form>
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
  apiError: PropTypes.bool,
}

EmailSmsForm.defaultProps = {
  apiError: false,
}

export default memo(EmailSmsForm)
