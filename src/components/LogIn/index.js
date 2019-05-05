import React, { useState } from 'react'
import './styles.scss'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('login')
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

export default LogIn
