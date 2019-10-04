import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../InputField'
import Checkbox from '../Checkbox'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

const CreateAccount = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rulesAccepted, setRulesAccepted] = useState('')

  const handleAccountCreation = async () => {}

  return (
    <div className="create-account-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="create-account-content-container">
        <p className="create-account-text">
          Tervetuloa Kohdataan-palveluun! Palvelussa voit tutustua uusiin
          ihmisiin ja löytää uusia ystäviä. Palvelun ikäraja on 15 vuotta.
        </p>
        <hr className="divider" />
        <h2 className="create-account-title">REKISTERÖITYMINEN</h2>
        <h3 className="create-account-text">Omat tiedot</h3>
        <p className="create-account-text">Nämä tiedot näkyvät vain sinulle</p>
        <div className="create-account-input-content-container">
          <InputField
            label="Etunimi"
            value={firstname}
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
            label="Salasana"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            inputClassName="create-account-input-text"
            labelClassName="create-account-input-field"
          />
          <p className="create-account-text">
            Tutustu palvelun
            {` `}
            <Link className="create-account-link" to="/createaccount">
              {'sääntöihin'}
            </Link>
            {` `}
            ennen rekisteröitymistä.
          </p>
          <Checkbox
            name="rules"
            value={rulesAccepted}
            onChange={e => setRulesAccepted(e.target.value)}
            label="Olen lukenut palvelun säännöt ja sitoudun noudattamaan niitä"
            labelClassName="create-account-text"
          />
          <ButtonContainer
            className="create-account-button"
            onClick={handleAccountCreation}
          >
            Rekisteröidy
          </ButtonContainer>
        </div>
        <div className="create-account-links-container">
          <Link className="create-account-link-block" to="/login">
            {'Kirjaudu sisään'}
          </Link>
          <Link className="create-account-link-block" to="/createaccount">
            {'Tutustu tietosuojaselosteeseen'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(CreateAccount)
