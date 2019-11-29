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
    marginRight: '20%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    border: 'solid 1px #f5a623',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px',
    backgroundColor: '#fff2e7',
  },
  overlay: {
    position: 'fixed',
    zIndex: '2000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}

const closeModalBtnStyle = {
  position: 'absolute',
  top: 5,
  right: 5,
  padding: '5px',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
}

const ToolTipModalContainer = props => {
  const { content, modalIsOpen, closeModal, label } = props

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={label}
      style={customStyles}
      role="dialog"
      aria-labelledby={label}
    >
      <div>
        <button
          type="button"
          className="close-modal-button"
          onClick={closeModal}
          style={closeModalBtnStyle}
          aria-label="close-dialog"
        >
          x
        </button>
        <p>{content}</p>
      </div>
    </Modal>
  )
}

ToolTipModalContainer.propTypes = {
  content: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default memo(ToolTipModalContainer)
