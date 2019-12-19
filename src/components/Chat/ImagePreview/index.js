import React, { memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const ImagePreview = props => {
  const { handleSubmit, message, handleChange, fileId, closeModal } = props

  return (
    <div className="image-preview-content">
      <div>
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
      <div>
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
            />
            <input type="submit" value="➤" className="send-message-button" />
          </form>
        </div>
        <ButtonContainer className="profile-modal-button" onClick={closeModal}>
          Palaa
        </ButtonContainer>
      </div>
    </div>
  )
}

ImagePreview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  fileId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

ImagePreview.defaultProps = {
  message: '',
}

export default memo(ImagePreview)
