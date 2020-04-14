import React, { memo, useState } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'

const RestoreAccount = props => {
  const { handleRestore, handleDeleteNow, history } = props
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const handleDelete = () => {
    handleDeleteNow()
    setModalIsOpen(false)
    history.push('/login')
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
          onClick={handleDelete}
        >
          En
        </ButtonContainer>
        <ButtonContainer
          className="account-cancel-delete-button"
          onClick={handleRestore}
        >
          Kyllä
        </ButtonContainer>
      </div>
    </ModalContainer>
  )
}

RestoreAccount.propTypes = {
  handleRestore: propTypes.func.isRequired,
  handleDeleteNow: propTypes.func.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
}

export default memo(RestoreAccount)
