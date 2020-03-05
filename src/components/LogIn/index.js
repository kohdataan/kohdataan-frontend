import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../ValidatedInputField'
import './styles.scss'

const LogIn = props => {
  const { handleLogin, user, uuid, linkError, textToAdd } = props
  const { register, handleSubmit, errors, setError, clearError } = useForm()

  // Set appropriate error given different errors
  useEffect(() => {
    if (user && user.errorMessage === 'Email needs to be verified') {
      setError('email', 'VerificationError')
    } else if (user && user.errorMessage) {
      setError('email', 'loginError')
      setError('password', 'loginError')
    }
  }, [user, setError])

  const onSubmit = async data => {
    await handleLogin(data.email.trim().toLowerCase(), data.password)
  }

  return (
    <main className="login-container">
      <h1 className="main-title">Kohdataan</h1>
      {uuid && <p id="message-text">Kiitos sähköpostin vahvistamisesta.</p>}
      {linkError && <p id="message-text">Tarkasta linkki.</p>}
      {textToAdd && <p id="message-text">{textToAdd}</p>}
      <div className="login-fields-container">
        <h2 className="login-title">KIRJAUTUMINEN</h2>
        <form
          className="login-input-fields-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="formfield-container">
            <ValidatedInputField
              label="Sähköposti"
              name="email"
              onChange={() => clearError()}
              ref={register({
                required: true,
              })}
              ariaInvalid={!!errors.email}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.email
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.email &&
                errors.email.type === 'required' &&
                'Kirjoita sähköpostiosoite.'}
              {errors.email &&
                errors.email.type === 'loginError' &&
                'Tarkista, että kirjoitit sähköpostin oikein.'}
              {errors.email &&
                errors.email.type === 'VerificationError' &&
                'Sähköposti pitää varmentaa ennen sisäänkirjautumista.'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Salasana"
              name="password"
              onChange={() => clearError()}
              ref={register({
                required: true,
              })}
              type="password"
              ariaInvalid={!!errors.password}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.password
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.password &&
                errors.password.type === 'required' &&
                'Kirjoita salasana.'}
              {errors.password &&
                errors.password.type === 'loginError' &&
                'Tarkista, että kirjoitit salasanan oikein.'}
            </div>
          </div>
          <button
            type="submit"
            className="create-account-button"
            onKeyPress={handleSubmit(onSubmit)}
            tabIndex="0"
          >
            Kirjaudu
          </button>
        </form>
        <div className="login-links-container">
          <Link className="login-link" to="/reset-password">
            Olen unohtanut salasanani.
          </Link>
          <Link className="login-link" to="/registrationproblem">
            Tarvitsen apua kirjautumisessa.
          </Link>
          <Link className="login-link" to="/createaccount">
            Olen uusi käyttäjä ja haluan rekisteröityä.
          </Link>
        </div>
      </div>
    </main>
  )
}

LogIn.propTypes = {
  uuid: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  linkError: PropTypes.bool,
  textToAdd: PropTypes.string,
}

LogIn.defaultProps = {
  uuid: false,
  linkError: false,
  textToAdd: null,
}

export default memo(LogIn)
