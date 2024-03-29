/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ServiceRulesContainer from '../../containers/ServiceRulesContainer'
import ValidatedInputField from '../ValidatedInputField'
import DateSelectField from '../DateSelectField'
import ButtonContainer from '../ButtonContainer'
import ModalContainer from '../ModalContainer'
import ToolTipModalContainer from '../../containers/ToolTipModalContainer'
import './styles.scss'
import PrivacyPolicy from '../PrivacyPolicy'
import AccessibilityStatement from '../AccessibilityStatement'

const CreateAccount = ({ handleAccountCreation, apiErrors }) => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm()
  const [rulesAccepted, setRulesAccepted] = useState(false)
  // const [phoneNumberModalIsOpen, setPhoneNumberModalIsOpen] = useState(false)
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [birthmonth, setBirthmonth] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [currentApiErrors, setCurrentApiErrors] = useState({})
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [privacyPolicyModalIsOpen, setPrivacyPolicyModalIsOpen] =
    useState(false)
  const [
    accessibilityStatementModalIsOpen,
    setAccessibilityStatementModalIsOpen,
  ] = useState(false)
  dayjs.extend(utc)
  dayjs.extend(customParseFormat)

  useEffect(() => {
    if (apiErrors && apiErrors.fields) {
      setCurrentApiErrors(apiErrors)
    }
  }, [apiErrors, setCurrentApiErrors])

  const closeAcceptModal = () => {
    setOpenErrorModal(false)
  }

  const onSubmit = (data) => {
    const usersBirthdate = dayjs(`${birthyear}-${birthmonth}-${birthday}`)
      .utc()
      .local()
      .format('YYYY-MM-DD')

    const ageInYears = dayjs().utc().local().diff(usersBirthdate, 'years')
    const ageAccepted = ageInYears >= 15
    if (!ageAccepted) {
      setError('day', {
        type: 'registrationError',
        message: 'Voit käyttää palvelua, jos olet yli 15-vuotias.',
      })
      setError('month', {
        type: 'registrationError',
        message: 'Voit käyttää palvelua, jos olet yli 15-vuotias.',
      })
      setError('year', {
        type: 'registrationError',
        message: 'Voit käyttää palvelua, jos olet yli 15-vuotias.',
      })
    }

    if (!rulesAccepted) {
      setOpenErrorModal(true)
    }

    if (ageAccepted && rulesAccepted) {
      handleAccountCreation(
        data.firstname.trim(),
        data.lastname.trim(),
        usersBirthdate.concat(' 00:00:00+00'),
        data.email.trim().toLowerCase(),
        data.phoneNumber.trim(),
        data.password
      )
    }
  }

  const closeModal = () => {
    // setPhoneNumberModalIsOpen(false)
    setPasswordModalIsOpen(false)
  }

  /*
  const openPhoneNumberModal = () => {
    setPhoneNumberModalIsOpen(true)
  }
  */

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true)
  }

  return (
    <main role="main" className="create-account-container">
      <h1 className="main-title">Kohdataan</h1>
      <div className="create-account-content-container">
        <h2 className="create-account-title">Rekisteröityminen</h2>
        <p className="create-account-text">
          Anna omat tiedot. Tiedot näkyvät vain sinulle. Kaikki tiedot ovat
          pakollisia.
        </p>
        <form
          className="create-account-input-content-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
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
          <div
            className={
              errors.year && errors.year.type === 'registrationError'
                ? 'select-birthdate-error-container'
                : 'select-birthdate-container'
            }
            aria-invalid={false}
          >
            <span className="birthdate-content-label">Syntymäaika</span>
            <div className="birthdate-container">
              <div className="formfield-container">
                <DateSelectField
                  label="Päivä"
                  name="day"
                  ref={() =>
                    register(
                      { name: 'day', type: 'custom' },
                      {
                        required: true,
                      }
                    )
                  }
                  errors={errors.day}
                  ariaInvalid={!!errors.day}
                  value={String(birthday)}
                  noOptionsMessage={() => 'Tarkista päivä.'}
                  onChange={(selected) => {
                    if (selected) {
                      clearErrors('day')
                      setBirthday(selected.value)
                    }
                    setValue('day', selected ? selected.value : null)
                  }}
                  inputClassName={
                    errors.day && errors.day.type === 'required'
                      ? 'create-birthdate-errors-field'
                      : 'create-account-input-date'
                  }
                />
              </div>

              <div className="formfield-container">
                <DateSelectField
                  label="Kuukausi"
                  name="month"
                  ref={() =>
                    register(
                      { name: 'month' },
                      {
                        required: true,
                      }
                    )
                  }
                  ariaInvalid={!!errors.birthdate}
                  errors={errors.month}
                  value={String(birthmonth)}
                  noOptionsMessage={() => 'Tarkista kuukausi.'}
                  onChange={(selected) => {
                    if (selected) {
                      clearErrors('month')
                      setBirthmonth(selected.value)
                    }
                    setValue('month', selected ? selected.value : null)
                  }}
                  inputClassName={
                    errors.month && errors.month.type === 'required'
                      ? 'create-birthdate-errors-field'
                      : 'create-account-input-date'
                  }
                />
              </div>

              <div className="formfield-container">
                <DateSelectField
                  label="Vuosi"
                  name="year"
                  ref={() =>
                    register(
                      { name: 'year' },
                      {
                        required: true,
                      }
                    )
                  }
                  ariaInvalid={!!errors.year}
                  errors={errors.year}
                  value={String(birthyear)}
                  noOptionsMessage={() => 'Tarkista vuosi.'}
                  onChange={(selected) => {
                    if (selected) {
                      clearErrors('year')
                      setBirthyear(selected.value)
                    }
                    setValue('year', selected ? selected.value : null)
                  }}
                  inputClassName={
                    errors.year && errors.year.type === 'required'
                      ? 'create-birthdate-errors-field'
                      : 'create-account-input-date'
                  }
                />
              </div>
            </div>
            <div className="birthdate-error-text">
              {((errors.day && errors.day.type === 'required') ||
                (errors.month && errors.month.type === 'required') ||
                (errors.year && errors.year.type === 'required')) &&
                'Anna syntymäaika.'}
              {((errors.day && errors.day.type === 'registrationError') ||
                (errors.month && errors.month.type === 'registrationError') ||
                (errors.year && errors.year.type === 'registrationError')) &&
                'Voit käyttää palvelua, jos olet yli 15-vuotias.'}
            </div>
          </div>
          <div className="formfield-container">
            <ValidatedInputField
              label="Sähköposti"
              name="email"
              type="email"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              onChange={(selected) => {
                if (selected) {
                  clearErrors('email')
                  setCurrentApiErrors({})
                }
              }}
              ariaInvalid={!!errors.email}
              inputClassName="create-account-input-text"
              labelClassName={
                errors.email ||
                (currentApiErrors &&
                  currentApiErrors.fields &&
                  currentApiErrors.fields.email)
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
              {currentApiErrors &&
                currentApiErrors.fields &&
                currentApiErrors.fields.email && (
                  <p>Olet jo rekisteröitynyt tällä sähköpostilla palveluun.</p>
                )}
            </div>
          </div>

          <div className="formfield-container">
            <div className="info-circle-line">
              <ValidatedInputField
                label="Puhelinnumero"
                name="phoneNumber"
                type="tel"
                ref={register({
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(\+358|00358|358|\+7|007|\+372|00372|\+46|0046|04|050)[0-9- ]{4,14}$/i,
                })}
                ariaInvalid={!!errors.phoneNumber}
                inputClassName="create-account-input-text"
                labelClassName={
                  errors.phoneNumber
                    ? 'create-account-errors-field'
                    : 'create-account-input-field'
                }
              />
            </div>

            <div className="error-text">
              {errors.phoneNumber &&
                errors.phoneNumber.type === 'required' &&
                'Kirjoita puhelinnumero'}
              {errors.phoneNumber &&
                (errors.phoneNumber.type === 'pattern' ||
                  errors.phoneNumber.type === 'minLength' ||
                  errors.phoneNumber.type === 'maxLength') &&
                'Tarkista puhelinnumero.'}
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
                  pattern:
                    /^(?=.*[0-9]+.*)(?=.*[a-zäöüß]+.*)(?=.*[A-ZÄÖÜ]+.*)[\w\W]{10,}$/,
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
                  id="password-info"
                  className="info-circle-button"
                  aria-label="salasana-info-nappi"
                  aria-labelledby="password-info"
                />
              </div>
              <ToolTipModalContainer
                modalIsOpen={passwordModalIsOpen}
                closeModal={closeModal}
                label="salasana-info-modaali"
                content="Salasanassa täytyy olla vähintään 10 merkkiä, yksi iso kirjain, yksi pieni kirjain ja yksi numero."
              />
            </div>
            <div className="error-text">
              {errors.password &&
                errors.password.type === 'required' &&
                'Kirjoita salasana'}
              {errors.password &&
                errors.password.type === 'pattern' &&
                'Salasanassa täytyy olla vähintään 10 merkkiä, yksi iso kirjain, yksi pieni kirjain ja yksi numero.'}
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
                validate: (value) => {
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
                'Salasanat eivät ole samat.'}
            </div>
          </div>
          <ServiceRulesContainer
            setRulesAccepted={setRulesAccepted}
            setOpenErrorModal={setOpenErrorModal}
          />
          {!rulesAccepted && (
            <ModalContainer
              modalIsOpen={openErrorModal}
              closeModal={closeAcceptModal}
              label="Käyttöehtoja ei hyväksytty"
            >
              <div>
                <ButtonContainer
                  className="icon-btn go-back-button close-modal-icon-btn"
                  onClick={closeAcceptModal}
                  label="Sulje"
                />
                <h3 className="accept-rules-modal-text">
                  Jos haluat käyttää palvelua, sinun täytyy hyväksyä
                  käyttöehdot.
                </h3>
              </div>
            </ModalContainer>
          )}
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
          <Link className="create-account-link-block" to="/login" tabIndex={0}>
            Olen vanha käyttäjä ja haluan kirjautua sisään.
          </Link>
          <Link className="create-account-link-block" to="/registrationproblem">
            Tarvitsen apua rekisteröitymisessä.
          </Link>
          <ButtonContainer
            className="create-account-link-block create-account-link-item create-account-link"
            role="link"
            onClick={() => setPrivacyPolicyModalIsOpen(true)}
          >
            Tutustu tietosuojaselosteeseen.
          </ButtonContainer>
          <ModalContainer
            modalIsOpen={privacyPolicyModalIsOpen}
            closeModal={() => setPrivacyPolicyModalIsOpen(false)}
            label="Tietosuojaseloste"
            isLong
            aria={{
              label: 'Tietosuojaseloste',
              modal: true,
            }}
          >
            <aside id="Tietosuojaseloste" className="privacy-policy-container">
              <PrivacyPolicy
                closeModal={() => setPrivacyPolicyModalIsOpen(false)}
              />
            </aside>
          </ModalContainer>
          <ButtonContainer
            className="create-account-link-block create-account-link-item create-account-link"
            role="link"
            onClick={() => setAccessibilityStatementModalIsOpen(true)}
          >
            Tutustu saavutettavuusselosteeseen.
          </ButtonContainer>
          <ModalContainer
            modalIsOpen={accessibilityStatementModalIsOpen}
            closeModal={() => setAccessibilityStatementModalIsOpen(false)}
            label="Saavutettavuusseloste"
            isLong
            aria={{
              label: 'Saavutettavuusseloste',
              modal: true,
            }}
          >
            <aside>
              <AccessibilityStatement
                closeModal={() => setAccessibilityStatementModalIsOpen(false)}
              />
            </aside>
          </ModalContainer>
        </div>
      </div>
    </main>
  )
}

CreateAccount.propTypes = {
  handleAccountCreation: PropTypes.func.isRequired,
  apiErrors: PropTypes.shape({
    name: PropTypes.string,
    errors: PropTypes.instanceOf(Array),
    fields: PropTypes.instanceOf(Object),
  }),
}

CreateAccount.defaultProps = {
  apiErrors: { name: '', errors: [], fields: {} },
}

export default memo(CreateAccount)
