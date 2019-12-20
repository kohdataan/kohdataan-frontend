import React, { memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const ImagePreview = props => {
  const { handleSubmit, message, handleChange, fileId, closeModal } = props

  return (
    <main className="image-preview-content">
      <div className="image">
        <ButtonContainer
          className="image-preview-close-modal-button"
          onClick={closeModal}
        >
          x
        </ButtonContainer>
        <img
          className="preview-image"
          src={`http://${
            process.env.REACT_APP_MATTERMOST_URL
          }/api/v4/files/${fileId}`}
          alt="attachment"
          width="100%"
          height="100%"
        />
      </div>
      <div className="image-preview-form">
        <div className="image-preview-user-input-wrapper">
          <form
            onSubmit={handleSubmit}
            className="image-preview-user-input-content"
          >
            <TextareaAutosize
              className="image-preview-user-input-text-field"
              id="image-message"
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Kirjoita viesti"
              maxRows={3}
              rows={1}
              aria-label="message text"
            />
            <input type="submit" value="➤" className="send-message-button" />
          </form>
        </div>
      </div>
    </main>
  )
}

ImagePreview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  fileId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

ImagePreview.defaultProps = {
  message: '',
}

export default memo(ImagePreview)
