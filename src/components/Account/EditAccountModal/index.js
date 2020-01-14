import React, { memo, useRef } from 'react'
import propTypes from 'prop-types'
import useForm from 'react-hook-form'
import ValidatedInputField from '../../ValidatedInputField'
import ModalContainer from '../../ModalContainer'
import useOutsideClick from '../../../hooks/useOutsideClick'
import './styles.scss'

const labels = {
  email: 'Uusi sähköpostiosoite',
  phoneNumber: 'Uusi puhelinnumero',
  password: 'Uusi salasana',
}
const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  phoneNumber: /^(\+358|00358|358|04|050)[0-9- ]{4,14}$/i,
  password: /^(?=.*[0-9]+.*)(?=.*[a-zäöüß]+.*)(?=.*[A-ZÄÖÜ]+.*)[\w\W]{10,}$/,
}
const messages = {
  email: 'Tarkista sähköpostiosoite.',
  phoneNumber: 'Tarkista puhelinnumero',
  password:
    'Salasanassa tulee olla vähintään 10 merkkiä, ja siinä pitää olla isoja kirjaimia, pieniä kirjaimia ja numeroita.',
}

const EditAccountModal = props => {
  const { showModal, updateUser, field, closeModal } = props
  const { register, handleSubmit, errors, watch } = useForm()
  const ref = useRef()
  const onSubmit = data => {
    updateUser(data)
  }

  useOutsideClick(ref, () => {
    closeModal()
  })

  return (
    <div className="leave-channel-modal-wrapper">
      <ModalContainer
        modalIsOpen={showModal}
        label="leaveChannelModal"
        closeModal={closeModal}
      >
        <form
          ref={ref}
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
                validate: value => {
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
              'Salasanat eivät ole samat'}
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
