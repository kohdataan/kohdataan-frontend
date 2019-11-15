import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
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

  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => {
    /* handleAccountCreation(
      firstname,
      lastname,
      birthdate,
      email,
      phoneNumber,
      password
    ) */
    alert(JSON.stringify(data))
  }

  const handleChange = value => {
    console.log('value ', value)
    setFirstname(value)
  }

  return (
    <main role="main" className="create-account-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="create-account-content-container">
        <h2 className="create-account-title">Rekisteröityminen</h2>
        <h3 className="create-account-text">Omat tiedot</h3>
        <p className="create-account-text">
          Nämä tiedot näkyvät vain sinulle. Kaikki tiedot ovat pakollisia.
        </p>
        <form
          className="create-account-input-content-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            label="Etunimi"
            value={firstname}
            name={firstname}
            ref={register({ required: true })}
            required
            autocomplete
            onChange={e => handleChange(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Etunimi
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Etunimi && 'Kirjoita etunimi'}
          </span>
          <InputField
            label="Sukunimi"
            value={lastname}
            name={lastname}
            ref={register({ required: true })}
            autocomplete
            onChange={e => setLastname(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Sukunimi
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Sukunimi && 'Kirjoita sukunimi'}
          </span>
          <InputField
            label="Syntymäaika"
            value={birthdate}
            name={birthdate}
            ref={register({ required: true })}
            onChange={e => setBirthdate(e.target.value)}
            type="date"
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Syntymäaika
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Syntymäaika && 'Valitse syntymäaika'}
          </span>
          <InputField
            label="Sähköposti"
            value={email}
            name={email}
            ref={register({ required: true, maxlength: 20 })}
            onChange={e => setEmail(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Sähköposti
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Sähköposti && 'Kirjoita sähköposti'}
          </span>
          <InputField
            label="Puhelinnumero"
            value={phoneNumber}
            name={phoneNumber}
            ref={register({ maxlength: 20 })}
            onChange={e => setPhoneNumber(e.target.value)}
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Puhelinnumero
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Puhelinnumero && 'Kirjoita puhelinnumero'}
          </span>
          <InputField
            label="Salasana"
            value={password}
            name={password}
            ref={register({ required: true, maxlength: 20 })}
            onChange={e => setPassword(e.target.value)}
            type="password"
            inputClassName="create-account-input-text"
            labelClassName={
              errors.Salasana
                ? 'create-account-errors-field'
                : 'create-account-input-field'
            }
          />
          <span className="error-text">
            {errors.Salasana && 'Kirjoita salasana'}
          </span>
          <p className="create-account-text">
            <Link className="create-account-link" to="/createaccount">
              {'Hyväksy palvelun säännöt'}
            </Link>
          </p>
          <button type="submit" className="create-account-button">
            {'Rekisteröidy '}
          </button>
        </form>
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
          <Link className="create-account-link-block" to="/">
            {'Tutustu saavutettavuusselosteeseen.'}
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
