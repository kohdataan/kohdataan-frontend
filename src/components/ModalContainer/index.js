import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    maxHeight: '80vh',
    minWidth: '290px',
    maxWidth: '400px',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const customStylesEditModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '7vh 5vh',
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '80vw',
    maxWidth: '400px',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const customStylesTutorial = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '8vh',
    minHeight: '30vh',
    maxHeight: '80vh',
    width: '80vw',
    maxWidth: '960px',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const customStylesLong = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    paddingTop: '30px',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'none',
    borderRadius: '5px',
    maxHeight: '95vh',
    maxWidth: '80vh',
    minWidth: '50vh',
    minHeight: '60vh',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const customStylesCookie = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    paddingTop: '10px',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'none',
    borderRadius: '5px',
    width: '90vw',
    maxHeight: '306px',
    maxWidth: '80vw',
    minHeight: '156px',
    minWidth: '330px',
    backgroundColor: '#2B373B',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const ModalContainer = props => {
  const {
    children,
    modalIsOpen,
    closeModal,
    label,
    isLong,
    tutorial,
    editModal,
    cookie,
  } = props

  const getStyles = () => {
    let styles = customStyles
    if (isLong) {
      styles = customStylesLong
    } else if (tutorial) {
      styles = customStylesTutorial
    } else if (editModal) {
      styles = customStylesEditModal
    } else if (cookie) {
      styles = customStylesCookie
    }
    return styles
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={label}
      style={getStyles()}
      role="dialog"
      aria={{
        labelledby: label,
        modal: true,
      }}
    >
      {children}
    </Modal>
  )
}

ModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
    PropTypes.node,
  ]).isRequired,
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isLong: PropTypes.bool,
  tutorial: PropTypes.bool,
  editModal: PropTypes.bool,
  cookie: PropTypes.bool,
}

ModalContainer.defaultProps = {
  isLong: false,
  modalIsOpen: false,
  editModal: false,
  tutorial: false,
  cookie: false,
}

export default memo(ModalContainer)
