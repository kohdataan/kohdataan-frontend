import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import TextArea from '../TextArea'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const RegistrationProblem = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  return (
    <main className="registration-problem-container">
      <h1 className="registration-problem-main-title">Kohdataan</h1>
      <div className="registration-problem-content-container">
        <div className="registration-problem-text">
          <p>Kerro millainen ongelma sinulla on.</p>
          <p>Vastaamme sinulle sähköpostilla mahdollisimman pian.</p>
          <hr className="divider" />
        </div>
        <div className="registration-problem-input-fields-container">
          <InputField
            label="Oma nimi"
            value={name}
            onChange={e => setName(e.target.value)}
            inputClassName="registration-problem-input-text"
            labelClassName="registration-problem-input-field"
          />
          <InputField
            label="Oma sähköposti"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="registration-problem-input-text"
            labelClassName="registration-problem-input-field"
          />
          <TextArea
            label="Viesti"
            value={message}
            onChange={e => setMessage(e.target.value)}
            inputClassName="registration-problem-input-text"
            labelClassName="registration-problem-input-field"
            rows="3"
          />
          <ButtonContainer
            className="registration-problem-button"
            onClick={() =>
              console.log(`message ${message} from user ${name} ${email} sent`)
            }
          >
            lähetä viesti
          </ButtonContainer>
        </div>
        <div className="registration-problem-links-container">
          <Link className="registration-problem-link" to="/">
            {'Olen unohtanut salasanani'}
          </Link>
          <Link className="registration-problem-link" to="/createaccount">
            {'Olen uusi käyttäjä ja haluan rekisteröityä'}
          </Link>
        </div>
      </div>
    </main>
  )
}

export default memo(RegistrationProblem)
