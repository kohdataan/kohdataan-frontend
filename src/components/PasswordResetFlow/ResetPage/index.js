import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../InputField'
import ButtonContainer from '../../ButtonContainer'
import * as API from '../../../api/user'
import './styles.scss'

const ResetPage = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleNewPW = async () => {
    await API.setNewPassword(password).then(e => {
      console.log(e)
    })
  }

  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">Salasanan vaihtaminen</h2>

        <div className="password-reset-input-container">
          <InputField
            label="Uusi salasana"
            value={password}
            onChange={e => setPassword(e.target.value)}
            inputClassName="password-reset-input-text"
            labelClassName="password-reset-input-field"
            showPlaceholder={false}
          />
          <InputField
            label="Uusi salasana uudestaan"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            inputClassName="password-reset-input-text"
            labelClassName="password-reset-input-field"
            showPlaceholder={false}
          />
          <ButtonContainer
            className="password-reset-button"
            onClick={handleNewPW}
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

export default memo(ResetPage)
