import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../ValidatedInputField'
import ToolTipModalContainer from '../../containers/ToolTipModalContainer'
import './styles.scss'

const PasswordResetPage = props => {
  const { handleNewPassword } = props
  const { register, handleSubmit, errors, watch } = useForm()
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false)

  const closeModal = () => {
    setPasswordModalIsOpen(false)
  }

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true)
  }

  return (
    <div className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">Salasanan vaihtaminen</h2>

        <form
          className="password-reset-input-container"
          onSubmit={handleSubmit(handleNewPassword)}
        >
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
                showPlaceholder={false}
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
              showPlaceholder={false}
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
          <button
            type="submit"
            className="create-account-button"
            onKeyPress={handleSubmit(handleNewPassword)}
            tabIndex="0"
          >
            {'Vaihda salasana '}
          </button>
        </form>

        <div className="password-reset-link-container">
          <Link className="password-reset-link" to="/login">
            Olen vanha käyttäjä ja haluan kirjautua sisään
          </Link>
        </div>
      </div>
    </div>
  )
}

PasswordResetPage.propTypes = {
  handleNewPassword: PropTypes.func.isRequired,
}

export default memo(PasswordResetPage)
