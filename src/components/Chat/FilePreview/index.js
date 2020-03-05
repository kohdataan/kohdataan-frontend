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
    orientation,
  } = props

  const getOrientationClassName = () => {
    let className
    switch (orientation) {
      case 2:
        className = 'flip'
        break
      case 3:
        className = 'rotate-180'
        break
      case 4:
        className = 'flip-and-rotate-180'
        break
      case 5:
        className = 'flip-and-rotate-270'
        break
      case 6:
        className = 'rotate-90'
        break
      case 7:
        className = 'flip-and-rotate-90'
        break
      case 8:
        className = 'rotate-270'
        break
      default:
        className = ''
        break
    }
    return className
  }

  const imageContentClassList = ['preview-image', getOrientationClassName()]

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
            className={imageContentClassList.join(' ')}
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
            <button type="submit" className="send-message-button" tabIndex="0">
              {}
            </button>
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
  orientation: PropTypes.number,
}

FilePreview.defaultProps = {
  message: '',
  orientation: 0,
}

export default memo(FilePreview)
