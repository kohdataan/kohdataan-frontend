import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'mattermost-redux/actions/users'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import * as API from '../../api/user'
import './styles.scss'
import { addUserToState } from '../../store/user/userAction'

const LogIn = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login: matterMostLogin } = props

  const handleLogin = async () => {
    try {
      const user = { email, password }

      await matterMostLogin(email, password)

      await API.userLogin(user).then(res => {
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('authToken', res.token)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

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
          <ButtonContainer className="login-button" onClick={handleLogin}>
            Kirjaudu
          </ButtonContainer>
        </div>
        <div className="login-links-container">
          <Link className="login-link" to="/">
            {'Olen unohtanut salasanani'}
          </Link>
          <Link className="login-link" to="/">
            {'Olen uusi käyttäjä ja haluan rekisteröityä'}
          </Link>
        </div>
      </div>
    </main>
  )
}

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      addUserToState,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(memo(LogIn))
