import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import useForm from 'react-hook-form'
import ValidatedInputField from '../../ValidatedInputField'
import ToolTipModalContainer from '../../../containers/ToolTipModalContainer'
import ButtonContainer from '../../ButtonContainer'
import * as API from '../../../api/user'
import './styles.scss'

const ResetPage = () => {
  const { register, handleSubmit, errors, watch } = useForm()
  const [email, setEmail] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleReset = async () => {
    const resetEmail = { email }
    await API.resetPassword(resetEmail).then(e => {
      console.log(e)
    })
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  console.log(errors)

  return (
    <main role="main" className="password-reset-container">
      <h1 className="main-title">Kohdataan</h1>

      <div className="password-reset-content-container">
        <h2 className="password-reset-title">Salasanan vaihtaminen</h2>
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
                onClick={openModal}
                className="info-circle-button"
                aria-labelledby="password-info"
              />
            </div>
            <ToolTipModalContainer
              modalIsOpen={modalIsOpen}
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
      </div>
      <ButtonContainer
        className="password-reset-button"
        onClick={handleSubmit(handleReset)}
      >
        Kirjaudu
      </ButtonContainer>
      <div className="password-reset-link-container">
        <Link className="password-reset-link" to="/createaccount">
          Olen uusi käyttäjä ja haluan rekisteröityä.
        </Link>
      </div>
    </main>
  )
}

export default memo(ResetPage)
