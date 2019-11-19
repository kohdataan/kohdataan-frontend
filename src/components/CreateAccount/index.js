import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../ValidatedInputField'
import InfoCircleIconPath from '../../assets/info-circle-solid-orange.svg'
import './styles.scss'

const CreateAccount = ({ handleAccountCreation }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

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
          <div className="formfield-container">
            <ValidatedInputField
              label="Etunimi"
              name={firstname}
              ref={register({ required: true, maxlength: 2 })}
              ariaInvalid={!!errors.Etunimi}
              ariaDescribedby="firstNameError"
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Etunimi
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.Etunimi && 'Kirjoita etunimi'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Sukunimi"
              name={lastname}
              ref={register({ required: true })}
              autocomplete
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Sukunimi
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.Sukunimi && 'Kirjoita sukunimi'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
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
            <div className="error-text">
              {errors.Syntymäaika && 'Valitse syntymäaika'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Sähköposti"
              name={email}
              ref={register({ required: true, maxlength: 20 })}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Sähköposti
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.Sähköposti && 'Kirjoita sähköposti'}
            </div>
          </div>

          <div className="formfield-container">
            <div className="info-circle-line">
              <ValidatedInputField
                label="Puhelinnumero"
                name={phoneNumber}
                ref={register({ required: true, minlength: 20 })}
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.Puhelinnumero
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
              <div className="info-circle">
                <img src={InfoCircleIconPath} alt="info" />
              </div>
            </div>

            <div className="error-text">
              {errors.Puhelinnumero && 'Kirjoita puhelinnumero'}
            </div>
          </div>

          <div className="formfield-container">
            <div className="info-circle-line">
              <ValidatedInputField
                label="Salasana"
                name={password}
                ref={register({ required: true, minlength: 2 })}
                type="password"
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.Salasana
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
              <div className="info-circle">
                <img src={InfoCircleIconPath} alt="info" />
              </div>
            </div>
            <div className="error-text">
              {errors.Salasana && 'Kirjoita salasana'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Salasana uudestaan"
              name={passwordConfirm}
              ref={register({ required: true, minlength: 2 })}
              type="password"
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Salasana
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.Salasana && 'Salasanojen eivät ole samat'}
            </div>
          </div>

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
