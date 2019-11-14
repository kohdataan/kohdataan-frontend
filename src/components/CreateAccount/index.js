import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const CreateAccount = ({ handleAccountCreation }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main role="main" className="create-account-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="create-account-content-container">
        <h2 className="create-account-title">Rekisteröityminen</h2>
        <h3 className="create-account-text">Omat tiedot</h3>
        <p className="create-account-text">
          Nämä tiedot näkyvät vain sinulle. Kaikki tiedot ovat pakollisia.
        </p>
        <div className="create-account-input-content-container">
          <InputField
            label="Etunimi"
            value={firstname}
            required
            autocomplete
            onChange={e => setFirstname(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <InputField
            label="Sukunimi"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <InputField
            label="Syntymäaika"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            type="date"
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <InputField
            label="Sähköposti"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <InputField
            label="Puhelinnumero"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <InputField
            label="Salasana"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <p className="create-account-text">
            <Link className="create-account-link" to="/createaccount">
              {'Hyväksy palvelun säännöt'}
            </Link>
          </p>
          <ButtonContainer
            className="create-account-button"
            onClick={handleAccountCreation}
          >
            Rekisteröidy
          </ButtonContainer>
        </div>
        <div className="create-account-links-container">
          <Link className="create-account-link-block" to="/login">
            {'Olen vanha käyttäjä ja haluan kirjautua sisään.'}
          </Link>
          <Link className="create-account-link-block" to="/registrationproblem">
            {'Tarvitsen apua rekisteröitymisessä.'}
          </Link>
          <Link className="create-account-link-block" to="/createaccount">
            {'Tutustu tietosuojaselosteeseen.'}
          </Link>
        </div>
      </div>
    </main>
  )
}

CreateAccount.propTypes = {
  handleAccountCreation: PropTypes.func.isRequired,
}

export default memo(CreateAccount)
