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
    maxHeight: '95vh',
    maxWidth: '80vh',
    minWidth: '50vh',
    minHeight: '60vh',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
}

const ImagePreviewModalContainer = props => {
  const { children, modalIsOpen, closeModal, label } = props

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={label}
      style={customStyles}
      role="dialog"
      aria-labelledby={label}
    >
      {children}
    </Modal>
  )
}

ImagePreviewModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
    PropTypes.node,
  ]).isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default memo(ImagePreviewModalContainer)
