import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../ButtonContainer'
import EditAccountModal from './EditAccountModal'
import DeleteAccountModal from './DeleteAccountModal'
import * as API from '../../api/user/user'
import './styles.scss'

const Account = (props) => {
  const {
    nodeUser,
    mmuser,
    updateUser,
    updatePassword,
    history,
    userLogout,
  } = props
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState(null)
  const [field, setField] = useState('')

  const openModal = (fieldName) => {
    setShowModal(!showModal)
    setField(fieldName)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const closeEditPage = () => {
    history.goBack()
  }

  const handleDeleteUser = async () => {
    try {
      const data = { mmid: mmuser.id }
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('authToken')
      const res = await API.deleteUser(data, id, token)
      if (res && res.success) {
        userLogout()
      } else if (res && res.message) {
        setDeleteError(res.message)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  const updateAccountInfo = (data) => {
    if (field === 'email') {
      updateUser({ mmid: mmuser.id, email: data.email.trim().toLowerCase() })
    } else if (field === 'phoneNumber') {
      updateUser({ phoneNumber: data.phoneNumber })
    } else if (field === 'firstname') {
      updateUser({ first_name: data.firstname })
    } else if (field === 'lastname') {
      updateUser({ last_name: data.lastname })
    } else if (field === 'password') {
      updatePassword({
        mmid: mmuser.id,
        id: nodeUser.id,
        email: mmuser.email,
        current_password: data.passwordCurrent,
        new_password: data.password,
      })
    }
    closeModal()
  }

  return (
    <main className="account-update-container">
      <div className="account-header">
        <h1>Muokkaa tietojasi</h1>
        <ButtonContainer
          className="icon-btn go-back-button close-edit-btn"
          onClick={closeEditPage}
        >
          <span className="sr-only">Sulje</span>
        </ButtonContainer>
      </div>
      <div className="account-info-text">
        <p>Nämä tiedot näkyvät vain sinulle. Kaikki tiedot ovat pakollisia.</p>
      </div>
      <div className="account-box-outer">
        <div className="account-box-inner">
          <div className="account-label-text">Etunimi</div>
          <ButtonContainer
            className="account-edit-button"
            onClick={() => openModal('firstname')}
            label="Muokkaa etunimeä"
          >
            Muokkaa
          </ButtonContainer>
        </div>
        <div className="account-box">{nodeUser.first_name}</div>
      </div>
      <div className="account-box-outer">
        <div className="account-box-inner">
          <div className="account-label-text">Sukunimi</div>
          <ButtonContainer
            className="account-edit-button"
            onClick={() => openModal('lastname')}
            label="Muokkaa sukunimeä"
          >
            Muokkaa
          </ButtonContainer>
        </div>
        <div className="account-box">{nodeUser.last_name}</div>
      </div>
      <div className="account-box-outer">
        <div className="account-box-inner">
          <div className="account-label-text">Sähköposti</div>
          <ButtonContainer
            className="account-edit-button"
            onClick={() => openModal('email')}
            label="Muokkaa sähköpostia"
          >
            Muokkaa
          </ButtonContainer>
        </div>
        <div className="account-box">{mmuser.email}</div>
      </div>
      <div className="account-box-outer">
        <div className="account-box-inner">
          <div className="account-label-text">Puhelinnumero</div>
          <ButtonContainer
            className="account-edit-button"
            onClick={() => openModal('phoneNumber')}
            label="Muokkaa puhelinnumeroa"
          >
            Muokkaa
          </ButtonContainer>
        </div>
        <div className="account-box">{nodeUser.phoneNumber}</div>
      </div>
      <div className="account-box-outer">
        <div className="account-box-inner">
          <div className="account-label-text">Salasana</div>
          <ButtonContainer
            className="account-edit-button"
            onClick={() => openModal('password')}
            label="Muokkaa salasanaa"
          >
            Muokkaa
          </ButtonContainer>
        </div>
        <div className="account-box">**************</div>
        {nodeUser &&
          nodeUser.errorMessage &&
          nodeUser.errorMessage.includes('password') && (
            <div className="edit-account-error-text">
              Salasanan päivittäminen epäonnistui!
            </div>
          )}
      </div>
      <div className="account-box-outer account-box-reduced-padding">
        <ButtonContainer
          className="account-delete-button button"
          onClick={() => setShowDeleteModal(true)}
        >
          Poista käyttäjätili
        </ButtonContainer>
      </div>
      <ButtonContainer
        className="button-secondary account-save-button"
        onClick={closeEditPage}
      >
        Tallenna
      </ButtonContainer>
      <EditAccountModal
        showModal={showModal}
        updateUser={updateAccountInfo}
        closeModal={closeModal}
        field={field}
      />
      <DeleteAccountModal
        showModal={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        deleteUser={handleDeleteUser}
        deleteError={deleteError}
      />
    </main>
  )
}

Account.propTypes = {
  nodeUser: propTypes.shape({
    id: propTypes.number,
    phoneNumber: propTypes.string,
    errorMessage: propTypes.string,
    first_name: propTypes.string,
    last_name: propTypes.string,
  }).isRequired,
  mmuser: propTypes.shape({ id: propTypes.string, email: propTypes.string })
    .isRequired,
  updateUser: propTypes.func.isRequired,
  updatePassword: propTypes.func.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
  userLogout: propTypes.func.isRequired,
}

export default memo(Account)
