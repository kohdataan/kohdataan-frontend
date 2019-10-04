import React, { useState, memo } from 'react'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import * as API from '../../api/user'
import './styles.scss'

const PasswordReset = () => {
  const [email, setEmail] = useState('')

  const handleReset = async () => {
    const resetEmail = { email }
    await API.resetPassword(resetEmail).then(e => {
      console.log(e)
    })
  }

  // TODO: Edit layout once design is finished.
  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-fields-container">
        <InputField
          label="Sähköposti"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputClassName="password-reset-input-text"
          labelClassName="password-reset-input-field"
        />
        <ButtonContainer className="reset-button" onClick={handleReset}>
          Resetoi salasana
        </ButtonContainer>
      </div>
    </div>
  )
}

export default memo(PasswordReset)
