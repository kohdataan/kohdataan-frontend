import React, { memo, useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'

const RestoreAccount = props => {
  const { handleRestore, handleDeleteNow } = props
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const handleDelete = () => {
    handleDeleteNow()
    setModalIsOpen(false)
  }
  return (
    <ModalContainer
      modalIsOpen={modalIsOpen}
      label="restore-user-container"
      closeModal={() => setModalIsOpen(false)}
    >
      <h3>Haluatko ottaa käyttäjätilisi uudelleen käyttöön?</h3>
      <div className="account-delete-buttons-wrapper">
        <ButtonContainer
          className="account-cancel-delete-button"
          secondary
          onClick={handleRestore}
        >
          Kyllä
        </ButtonContainer>
        <ButtonContainer
          className="account-delete-button"
          onClick={handleDelete}
        >
          En
        </ButtonContainer>
      </div>
    </ModalContainer>
  )
}

RestoreAccount.propTypes = {
  handleRestore: propTypes.func.isRequired,
  handleDeleteNow: propTypes.func.isRequired,
}

export default memo(RestoreAccount)
