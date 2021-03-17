import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import ValidatedInputField from '../ValidatedInputField'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'
import './styles.scss'

// This component needs a function that takes in an object that contains email and phonenumber,
// And then do something with this data. (send email with verification link, send password reset link, etc..)

const EmailSmsForm = (props) => {
  const {
    title,
    pagePurpose,
    handleRequest,
    apiError,
    setApiError,
    text,
    setText,
  } = props
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit, errors, setError, clearErrors } = useForm()

  useEffect(() => {
    const setApiErrors = () => {
      if (apiError && text === '') {
        setError('email', { type: 'loginError' })
      } else if (apiError && text !== '') {
        setShowModal(true)
      }
    }
    setApiErrors()
  }, [apiError, text, setError])

  const onSubmit = async (data) => {
    await handleRequest(data.email.trim().toLowerCase())
  }

  const closeModal = () => {
    setText('')
    setApiError(false)
    setShowModal(false)
  }

  return (
    <div className="email-sms-form-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="email-sms-form-content-container">
        <h2 className="email-sms-form-title">{title}</h2>
        <p>Anna sähköpostiosoitteesi.</p>
        {pagePurpose === 'changePassword' ? (
          <p>
            Lähetämme sinulle linkin, josta pääset vaihtamaan unohtuneen
            salasanan.
          </p>
        ) : (
          <p>
            Lähetämme sinulle uudelleen linkin, josta pääset vahvistamaan
            sähköpostisi ja kirjautumaan sisään.
          </p>
        )}

        <div className="email-sms-form-input-container">
          <form
            className="email-sms-input-fields-container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="formfield-container">
              <ValidatedInputField
                label="Sähköposti"
                name="email"
                ref={register({
                  required: true,
                })}
                ariaInvalid={!!errors.email}
                onChange={() => {
                  clearErrors()
                  setApiError(false)
                }}
                inputClassName="registration-problem-input-text"
                labelClassName="registration-problem-input-field"
                showPlaceholder={false}
              />
              <div className="error-text">
                {errors.email &&
                  errors.email.type === 'required' &&
                  'Kirjoita sähköpostiosoite.'}
                {errors.email &&
                  errors.email.type === 'loginError' &&
                  'Tarkista sähköposti.'}
              </div>
            </div>
            <div className="hidden-field">
              <ValidatedInputField
                label="Puhelinnumero"
                value={phoneNumber}
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                inputClassName="registration-problem-input-text"
                labelClassName="registration-problem-input-field"
                showPlaceholder={false}
              />
            </div>
            <button
              type="submit"
              className="registration-problem-button email-sms-form-button"
              onClick={handleSubmit(onSubmit)}
              tabIndex={0}
            >
              Lähetä
            </button>
          </form>
          <div className="registration-problem-link-container">
            <Link
              className="registration-problem-link"
              to="/registrationproblem"
            >
              Tarvitsen apua kirjautumisessa.
            </Link>
            <Link className="registration-problem-link" to="/login">
              Haluan kirjautua sisään.
            </Link>
          </div>
        </div>
      </div>
      <ModalContainer
        modalIsOpen={showModal}
        closeModal={closeModal}
        label="Email already confirmed"
      >
        <div>
          <h3 className="edit-profile-modal-text">{text}</h3>
          <ButtonContainer
            className="icon-btn edit-profile-icon-btn"
            onClick={closeModal}
            label="Sulje"
          >
            <div className="go-back-button" />
          </ButtonContainer>
        </div>
      </ModalContainer>
    </div>
  )
}

EmailSmsForm.propTypes = {
  handleRequest: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  pagePurpose: PropTypes.string.isRequired,
  apiError: PropTypes.bool,
  setApiError: PropTypes.func,
  text: PropTypes.string,
  setText: PropTypes.func,
}

EmailSmsForm.defaultProps = {
  apiError: false,
  setApiError: null,
  text: '',
  setText: null,
}

export default memo(EmailSmsForm)
