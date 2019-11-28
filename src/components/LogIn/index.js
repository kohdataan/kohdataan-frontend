import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const LogIn = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = props
  return (
    <main className="login-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="login-fields-container">
        <h2 className="login-title">KIRJAUTUMINEN</h2>
        <div className="login-input-fields-container">
          <InputField
            label="Sähköposti"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="login-input-text"
            labelClassName="login-input-field"
          />
          <InputField
            label="Salasana"
            value={password}
            onChange={e => setPassword(e.target.value)}
            inputClassName="login-input-text"
            labelClassName="login-input-field"
            type="password"
          />
          <ButtonContainer
            className="login-button"
            onClick={() => handleLogin(email, password)}
          >
            Kirjaudu
          </ButtonContainer>
        </div>
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
