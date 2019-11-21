import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../ValidatedInputField'
import DateSelectField from '../DateSelectField'
import InfoCircleIconPath from '../../assets/info-circle-solid-orange.svg'
import './styles.scss'

const CreateAccount = ({ handleAccountCreation }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const onSubmit = data => {
    console.log("Data", data)
    var birthdate = data.day.toString()
    birthdate = birthdate.concat("-")
    birthdate = birthdate.concat(data.month.toString())
    birthdate = birthdate.concat("-")
    birthdate = birthdate.concat(data.year.toString())
    handleAccountCreation(
      data.firstname,
      data.lastname,
      birthdate,
      data.email,
      data.phoneNumber,
      data.password
    )
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
              name="firstname"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
                pattern: /^[\D\d-]+$/i,
              })}
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
              {errors.firstname &&
                errors.firstname.type === 'required' &&
                'Kirjoita etunimi'}
              {errors.firstname &&
                (errors.firstname.type === 'minLength' ||
                  errors.firstname.type === 'maxLength') &&
                'Etunimen tulee olla 2-20 merkkiä pitkä.'}
              {errors.firstname &&
                errors.firstname.type === 'pattern' &&
                'Tarkista, että kirjoitit etunimen oikein.'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Sukunimi"
              name="lastname"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 30,
                pattern: /^[\D\d-]+$/i,
              })}
              autocomplete
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Sukunimi
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.lastname &&
                errors.lastname.type === 'required' &&
                'Kirjoita sukunimi'}
              {errors.lastname &&
                (errors.lastname.type === 'minLength' ||
                  errors.lastname.type === 'maxLength') &&
                'Sukunimen tulee olla 2-30 merkkiä pitkä.'}
              {errors.lastname &&
                errors.lastname.type === 'pattern' &&
                'Tarkista, että kirjoitit sukunimen oikein.'}
            </div>
          </div>

          <div className="formfield-container">
            <DateSelectField
              label="Syntymäaika"
              name="birthdate"
              ref={register({ required: true })}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Syntymäaika
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.birthdate && 'Valitse syntymäaika'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Sähköposti"
              name="email"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Sähköposti
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.email &&
                errors.email.type === 'required' &&
                'Kirjoita sähköpostiosoite.'}
              {errors.email &&
                errors.email.type === 'pattern' &&
                'Tarkista sähköpostiosoite.'}
            </div>
          </div>

          <div className="formfield-container">
            <div className="info-circle-line">
              <ValidatedInputField
                label="Puhelinnumero"
                name="phoneNumber"
                ref={register({ required: true, minLength: 5 })}
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.phoneNumber
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
              <div className="info-circle">
                <img src={InfoCircleIconPath} alt="info" />
              </div>
            </div>

            <div className="error-text">
              {errors.phoneNumber && 'Kirjoita puhelinnumero'}
            </div>
          </div>

          <div className="formfield-container">
            <div className="info-circle-line">
              <ValidatedInputField
                label="Salasana"
                name="password"
                ref={register({
                  required: true,
                  maxLength: 30,
                  // password must contain lower and upper case letters and numbers
                  pattern: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
                })}
                type="password"
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.password
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
              <div className="info-circle">
                <img src={InfoCircleIconPath} alt="info" />
              </div>
            </div>
            <div className="error-text">
              {errors.password &&
                errors.password.type === 'required' &&
                'Kirjoita salasana'}
              {errors.password &&
                errors.password.type === 'pattern' &&
                'Salasanan on oltava vähintään 8 merkkiä pitkä ja siinä pitää olla isoja kirjaimia, pieniä kirjaimia ja numeroita.'}
              {errors.password &&
                errors.password.type === 'maxLength' &&
                'Salasanan on oltava enintään 30 merkkiä pitkä.'}
            </div>
          </div>

          <div className="formfield-container">
            <ValidatedInputField
              label="Salasana uudestaan"
              name="passwordConfirm"
              ref={register({
                required: true,
                validate: value => {
                  return value === watch('password')
                },
              })}
              type="password"
              inputClassName="create-account-input-text"
              labelClassName={
                errors.Salasana
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'required' &&
                'Kirjoita salasana uudestaan'}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'validate' &&
                'Salasanat eivät ole samat'}
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
