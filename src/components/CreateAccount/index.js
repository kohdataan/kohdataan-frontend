import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import moment from 'moment'
import ServiceRulesContainer from '../../containers/ServiceRulesContainer'
import ValidatedInputField from '../ValidatedInputField'
import DateSelectField from '../DateSelectField'
import ToolTipModalContainer from '../../containers/ToolTipModalContainer'
import './styles.scss'

const CreateAccount = ({ handleAccountCreation }) => {
  const { register, handleSubmit, errors, watch } = useForm()
  const [rulesAccepted, setRulesAccepted] = useState(false)
  const [phoneNumberModalIsOpen, setPhoneNumberModalIsOpen] = useState(false)
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [birthmonth, setBirthmonth] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const onSubmit = data => {
    const birthdate = moment
      .utc({
        year: birthyear,
        month: birthmonth - 1,
        day: birthday,
      })
      .format()
    console.log(birthdate)
    if (rulesAccepted) {
      handleAccountCreation(
        data.firstname.trim(),
        data.lastname.trim(),
        birthdate,
        data.email.trim().toLowerCase(),
        data.phoneNumber,
        data.password
      )
    } else {
      alert('Sinun on hyväksyttävä palvelun säännöt.')
    }
  }

  const closeModal = () => {
    setPhoneNumberModalIsOpen(false)
    setPasswordModalIsOpen(false)
  }

  const openPhoneNumberModal = () => {
    setPhoneNumberModalIsOpen(true)
  }

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true)
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
                pattern: /^[a-z A-ZäöüßÄÖÜ'-]+$/i,
              })}
              ariaInvalid={!!errors.firstname}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.firstname
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
                pattern: /^[a-z A-ZäöüßÄÖÜ'-]+$/i,
              })}
              autocomplete
              ariaInvalid={!!errors.lastname}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.lastname
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
              label="Päivä"
              name="day"
              ref={register({ required: true })}
              ariaInvalid={!!errors.birthdate}
              value={birthday}
              onChange={value => setBirthday(value.value)}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.birthdate
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.birthdate && 'Valitse syntymäaika'}
            </div>
          </div>

          <div className="formfield-container">
            <DateSelectField
              label="Kuukausi"
              name="month"
              ref={register({ required: true })}
              ariaInvalid={!!errors.birthdate}
              value={birthmonth}
              onChange={value => {
                setBirthmonth(value.value)
              }}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.birthdate
                  ? 'create-account-errors-field'
                  : 'create-account-input-field'
              }
            />
            <div className="error-text">
              {errors.birthdate && 'Valitse syntymäaika'}
            </div>
          </div>

          <div className="formfield-container">
            <DateSelectField
              label="Vuosi"
              name="year"
              ref={register({ required: true })}
              ariaInvalid={!!errors.birthdate}
              value={birthyear}
              onChange={value => {
                setBirthyear(value.value)
              }}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.birthdate
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
              ariaInvalid={!!errors.email}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.email
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
                ref={register({
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(\+358|00358|358|04|050)[0-9- ]{4,14}$/i,
                })}
                ariaInvalid={!!errors.phoneNumber}
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.phoneNumber
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />

              <div className="info-circle">
                <button
                  type="button"
                  onClick={openPhoneNumberModal}
                  className="info-circle-button"
                  aria-labelledby="phonenumber-info"
                />
              </div>
            </div>
            <ToolTipModalContainer
              modalIsOpen={phoneNumberModalIsOpen}
              closeModal={closeModal}
              label="show-phonenumber-info-dialog"
              content="Jos unohdat salasanan, voit vaihtaa sen puhelinnumeron avulla."
            />
            <div className="error-text">
              {errors.phoneNumber &&
                errors.phoneNumber.type === 'required' &&
                'Kirjoita puhelinnumero'}
              {errors.phoneNumber &&
                (errors.phoneNumber.type === 'pattern' ||
                  errors.phoneNumber.type === 'minLength' ||
                  errors.phoneNumber.type === 'maxLength') &&
                'Tarkista puhelinnumero'}
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
                  pattern: /^(?=.*[0-9]+.*)(?=.*[a-zäöüß]+.*)(?=.*[A-ZÄÖÜ]+.*)[\w\W]{10,}$/,
                })}
                type="password"
                ariaInvalid={!!errors.password}
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.password
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
              <div className="info-circle">
                <button
                  type="button"
                  onClick={openPasswordModal}
                  className="info-circle-button"
                  aria-labelledby="password-info"
                />
              </div>
              <ToolTipModalContainer
                modalIsOpen={passwordModalIsOpen}
                closeModal={closeModal}
                label="show-password-info-dialog"
                content="Salasanassa tulee olla vähintään 10 merkkiä, ja siinä pitää
                olla isoja kirjaimia, pieniä kirjaimia ja numeroita."
              />
            </div>
            <div className="error-text">
              {errors.password &&
                errors.password.type === 'required' &&
                'Kirjoita salasana'}
              {errors.password &&
                errors.password.type === 'pattern' &&
                'Salasanan on oltava vähintään 10 merkkiä pitkä ja siinä pitää olla isoja kirjaimia, pieniä kirjaimia ja numeroita.'}
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
              ariaInvalid={!!errors.passwordConfirm}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.passwordConfirm
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
          <ServiceRulesContainer setRulesAccepted={setRulesAccepted} />
          <button
            type="submit"
            className="create-account-button"
            onKeyPress={handleSubmit(onSubmit)}
            tabIndex="0"
          >
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
          <Link className="create-account-link-block" to="/">
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
