import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import ValidatedTextArea from '../ValidatedTextArea'
import ValidatedInputField from '../ValidatedInputField'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const RegistrationProblem = ({ handleEmailSending, handleClick, text }) => {
  const { register, handleSubmit, errors, clearError } = useForm()

  const onSubmit = async data => {
    await handleEmailSending(
      data.name.trim(),
      data.email.trim(),
      data.message.trim(),
      handleClick ? 'Yhteydenotto' : 'Ongelma rekisteröitymisessä'
    )
  }

  return (
    <main className="registration-problem-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="registration-problem-content-container">
        {!text && (
          <div className="registration-problem-text">
            <p>Kerro mitä apua tarvitset.</p>
            <p>Vastaamme sinulle sähköpostilla mahdollisimman pian.</p>
            <hr className="registration-problem-divider" />
          </div>
        )}
        {text && (
          <div className="registration-problem-text">
            <p className="registration-success-text">{text}</p>
            <hr className="registration-problem-divider" />
          </div>
        )}
        <div className="registration-problem-input-fields-container">
          <form
            className="registration-problem-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="formfield-container">
              <ValidatedInputField
                label="Oma nimi"
                name="name"
                onChange={() => clearError('name')}
                ref={register({
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                  pattern: /^[a-z A-ZäöüßÄÖÜ'-]+$/i,
                })}
                ariaInvalid={!!errors.name}
                inputClassName="registration-problem-input-text"
                labelClassName={
                  errors.name
                    ? 'registration-problem-errors-field'
                    : 'registration-problem-input-field'
                }
              />
              <div className="error-text">
                {errors.name &&
                  errors.name.type === 'required' &&
                  'Kirjoita nimi.'}
                {errors.name &&
                  (errors.name.type === 'minLength' ||
                    errors.name.type === 'maxLength' ||
                    errors.name.type === 'pattern') &&
                  'Tarkista, että kirjoitit nimen oikein.'}
              </div>
            </div>

            <div className="formfield-container">
              <ValidatedInputField
                label="Oma sähköposti"
                name="email"
                onChange={() => clearError('email')}
                ref={register({
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                ariaInvalid={!!errors.email}
                inputClassName="registration-problem-input-text"
                labelClassName={
                  errors.email
                    ? 'registration-problem-errors-field'
                    : 'registration-problem-input-field'
                }
              />
              <div className="error-text">
                {errors.email &&
                  errors.email.type === 'required' &&
                  'Kirjoita sähköposti.'}
                {errors.email &&
                  errors.email.type === 'pattern' &&
                  'Tarkista, että kirjoitit sähköpostin oikein.'}
              </div>
            </div>
            <div className="formfield-container">
              <ValidatedTextArea
                label="Viesti"
                name="message"
                onChange={() => clearError('messsage')}
                ref={register({
                  required: true,
                })}
                ariaInvalid={!!errors.message}
                inputClassName="registration-problem-input-text"
                labelClassName={
                  errors.message
                    ? 'registration-problem-errors-field'
                    : 'registration-problem-input-field'
                }
                rows={3}
              />
              <div className="error-text">
                {errors.message &&
                  errors.message.type === 'required' &&
                  'Kirjoita viesti.'}
              </div>
            </div>
            <button
              type="submit"
              className="button registration-problem-button"
              onKeyPress={handleSubmit(onSubmit)}
              tabIndex="0"
            >
              lähetä viesti
            </button>
          </form>
          {handleClick && (
            <ButtonContainer
              className="registration-problem-button"
              onClick={handleClick}
              tabIndex="0"
            >
              Sulje
            </ButtonContainer>
          )}
        </div>
        {!handleClick && (
          <div className="registration-problem-links-container">
            <Link className="registration-problem-link" to="/login">
              Olen vanha käyttäjä ja haluan kirjautua sisään.
            </Link>
            <Link className="registration-problem-link" to="/createaccount">
              Olen uusi käyttäjä ja haluan rekisteröityä.
            </Link>
            <Link className="registration-problem-link" to="/reset-password">
              Olen unohtanut salasanani.
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

RegistrationProblem.propTypes = {
  handleEmailSending: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  text: PropTypes.string,
}

RegistrationProblem.defaultProps = {
  handleClick: null,
  text: '',
}

export default memo(RegistrationProblem)
