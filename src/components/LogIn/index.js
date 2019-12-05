import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../ValidatedInputField'
import './styles.scss'

const LogIn = props => {
  const { handleLogin } = props
  const { register, handleSubmit, errors, setError } = useForm()

  const onSubmit = async data => {
    try {
      const response = await handleLogin(data.email.trim(), data.password)
      if (!response) {
        setError(
          'email',
          'pattern',
          'Tarkista, että kirjoitit käyttäjätunnuksen oikein.'
        )
        setError(
          'password',
          'pattern',
          'Tarkista, että kirjoitit salasanan oikein.'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="login-container">
      <h1 className="main-title">Kohdataan</h1>
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
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                errors.email.type === 'pattern' &&
                'Tarkista, että kirjoitit käyttäjätunnuksen oikein.'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Salasana"
              name="password"
              ref={register({
                required: true,
                maxLength: 30,
                // password must contain lower and upper case letters and numbers
                pattern: /^(?=.*[0-9]+.*)(?=.*[a-zäöüß]+.*)(?=.*[A-ZÄÖÜ]+.*)[\w\W]{10,}$/,
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
                'Kirjoita salasana'}
              {errors.password &&
                (errors.password.type === 'pattern' ||
                  errors.password.type === 'maxLength') &&
                'Tarkista, että kirjoitit salasanan oikein.'}
            </div>
          </div>
          <button
            type="submit"
            className="create-account-button"
            onKeyPress={handleSubmit(onSubmit)}
            tabIndex="0"
          >
            {'Kirjaudu'}
          </button>
        </form>
        <div className="login-links-container">
          <Link className="login-link" to="/reset-password">
            {'Olen unohtanut salasanani'}
          </Link>
          <Link className="login-link" to="/createaccount">
            {'Olen uusi käyttäjä ja haluan rekisteröityä'}
          </Link>
        </div>
      </div>
    </main>
  )
}

LogIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default memo(LogIn)
