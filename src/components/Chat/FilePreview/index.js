import React, { memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const FilePreview = props => {
  const {
    handleSubmit,
    message,
    handleChange,
    fileId,
    closeModal,
    filesData,
  } = props

  return (
    <main className="image-preview-content">
      <div className="image">
        <ButtonContainer
          className="image-preview-close-modal-button go-back-button"
          onClick={closeModal}
        >
          {' '}
        </ButtonContainer>
        {fileId && filesData[fileId].mime_type.includes('image') && (
          <img
            className="preview-image"
            src={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${fileId}`}
            alt="attachment"
            width="100%"
            height="100%"
          />
        )}
        {fileId && filesData[fileId].mime_type.includes('video') && (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={`${process.env.REACT_APP_MATTERMOST_URL}/api/v4/files/${fileId}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
        )}
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
<<<<<<< HEAD:src/components/Chat/ImagePreview/index.js
            <button type="submit" className="send-message-button" tabIndex="0">
              {}
            </button>
=======
            <input type="submit" value="" className="send-message-button" />
>>>>>>> development:src/components/Chat/FilePreview/index.js
          </form>
        </div>
      </div>
    </main>
  )
}

FilePreview.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  fileId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  filesData: PropTypes.instanceOf(Object).isRequired,
}

FilePreview.defaultProps = {
  message: '',
}

export default memo(FilePreview)
