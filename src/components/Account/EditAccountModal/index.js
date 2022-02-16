/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react'
import propTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import ValidatedInputField from '../../ValidatedInputField'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import './styles.scss'

const labels = {
  email: 'Uusi sähköposti',
  phoneNumber: 'Uusi puhelinnumero',
  password: 'Uusi salasana',
  firstname: 'Uusi etunimi',
  lastname: 'Uusi sukunimi',
}
const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  phoneNumber:
    /^(\+358|00358|358|\+7|007|\+372|00372|\+46|0046|04|050)[0-9- ]{4,14}$/i,
  password: /^(?=.*[0-9]+.*)(?=.*[a-zäöüß]+.*)(?=.*[A-ZÄÖÜ]+.*)[\w\W]{10,}$/,
  firstname: /^[a-z A-ZäöüßÄÖÜ'-]+$/i,
  lastname: /^[a-z A-ZäöüßÄÖÜ'-]+$/i,
}
const messages = {
  email: 'Tarkista sähköpostiosoite.',
  phoneNumber: 'Tarkista puhelinnumero',
  password:
    'Salasanassa täytyy olla vähintään 10 merkkiä, yksi iso kirjain, yksi pieni kirjain ja yksi numero.',
  firstname: 'Etunimen tulee olla 2-20 merkkiä pitkä.',
  lastname: 'Sukunimen tulee olla 2-30 merkkiä pitkä.',
}

const EditAccountModal = (props) => {
  const { showModal, updateUser, field, closeModal } = props
  const { register, handleSubmit, errors, watch } = useForm()

  const onSubmit = (data) => {
    updateUser(data)
  }

  return (
    <div className="leave-channel-modal-wrapper">
      <ModalContainer
        modalIsOpen={showModal}
        label="Muokkaa tietoja"
        closeModal={closeModal}
        editModal
      >
        <ButtonContainer
          className="icon-btn go-back-button edit-account-close-button"
          onClick={closeModal}
        >
          <span className="sr-only">Sulje</span>
        </ButtonContainer>
        <form
          className="edit-account-input-content-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {field === 'password' && (
            <ValidatedInputField
              label="Nykyinen salasana"
              name="passwordCurrent"
              type="password"
              ref={register({
                required: true,
                pattern: patterns[field],
              })}
              ariaInvalid={!!errors[field]}
              inputClassName="edit-account-input-text"
              labelClassName={
                errors[field]
                  ? 'edit-account-errors-field'
                  : 'edit-account-input-field'
              }
            />
          )}
          <ValidatedInputField
            label={labels[field]}
            name={field}
            ref={register({
              required: true,
              pattern: patterns[field],
            })}
            ariaInvalid={!!errors[field]}
            type={field === 'password' ? 'password' : 'text'}
            inputClassName="edit-account-input-text"
            labelClassName={
              errors[field]
                ? 'edit-account-errors-field'
                : 'edit-account-input-field'
            }
          />
          {field === 'password' && (
            <ValidatedInputField
              label="Salasana uudestaan"
              type="password"
              name="passwordConfirm"
              ref={register({
                required: true,
                validate: (value) => {
                  return value === watch('password')
                },
              })}
              ariaInvalid={!!errors.passwordConfirm}
              inputClassName="edit-account-input-text"
              labelClassName={
                errors[field]
                  ? 'edit-account-errors-field'
                  : 'edit-account-input-field'
              }
            />
          )}
          <div className="edit-account-error-text">
            {errors[field] && messages[field]}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === 'validate' &&
              'Salasanat eivät ole samat.'}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === 'required' &&
              'Kirjoita salasana uudestaan'}
          </div>
          <button
            type="submit"
            className="edit-account-button"
            onKeyPress={() => handleSubmit(onSubmit)}
            onClick={() => handleSubmit(onSubmit)}
            tabIndex="0"
          >
            {'Tallenna '}
          </button>
        </form>
      </ModalContainer>
    </div>
  )
}

EditAccountModal.propTypes = {
  showModal: propTypes.bool.isRequired,
  updateUser: propTypes.func.isRequired,
  field: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
}

export default memo(EditAccountModal)
