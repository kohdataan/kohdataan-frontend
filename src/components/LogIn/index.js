import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from 'mattermost-redux/actions/users'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import * as API from '../../api/user'
import './styles.scss'

const LogIn = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login: matterMostLogin } = props

  const handleLogin = async () => {
    const user = { email, password }
    await API.userLogin(user).then(e => {
      console.log(e)
    })
    await matterMostLogin(email, password)
  }

  return (
    <div className="login-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="login-fields-container">
        <InputField
          label="Sähköposti"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputClassName="login-input-label"
          labelClassName="login-input-field"
        />
        <InputField
          label="Salasana"
          value={password}
          onChange={e => setPassword(e.target.value)}
          inputClassName="login-input-label"
          labelClassName="login-input-field"
        />
        <ButtonContainer className="login-button" onClick={handleLogin}>
          Sisään
        </ButtonContainer>
      </div>
    </div>
  )
}

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(LogIn)
