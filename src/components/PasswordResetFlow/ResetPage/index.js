import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../InputField'
import ButtonContainer from '../../ButtonContainer'
import * as API from '../../../api/user'
import './styles.scss'

const ResetPage = () => {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleReset = async () => {
    const resetEmail = { email }
    await API.resetPassword(resetEmail).then(e => {
      console.log(e)
    })
  }

  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2>Salasanan vaihtaminen</h2>
        <p>
            Lähetimme sinulle sähköpostilla linkin, josta pääset vaihtamaan salasanan.
        </p>
        <p>
          Lähetämme sinulle linkin, josta pääset vaihtamaan unohtuneen salasanan.
        </p>

        <div className="password-reset-input-container">
          <InputField
            label="Sähköpostiosoite"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="password-reset-input-text"
            labelClassName="password-reset-input-field"
            showPlaceholder={false}
          />
          <InputField
            label="Puhelinnumero"
            value={email}
            onChange={e => setPhoneNumber(e.target.value)}
            inputClassName="password-reset-input-text"
            labelClassName="password-reset-input-field"
            showPlaceholder={false}
          />
          <ButtonContainer className="reset-button" onClick={handleReset}>
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
