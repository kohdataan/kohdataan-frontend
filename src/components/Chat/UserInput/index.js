import React, { useState, memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import EXIF from 'exif-js'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import FilePreview from '../FilePreview'
import AudioInput from '../AudioInput'
import BouncingLoader from '../../BouncingLoader'
import './styles.scss'

const UserInput = props => {
  const { createPost, channel, uploadFile, filesData } = props
  const [message, setMessage] = useState('')
  const [fileId, setFileId] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false)
  const [orientation, setOrientation] = useState(0)

  const getExifData = file => {
    // get Exif data for file if it exists.
    // Exif data is used to rotate the image to the correct orientation.
    if (file && isBrowser) {
      EXIF.getData(file, () => {
        const exifData = EXIF.pretty(file)
        if (exifData) {
          const orientationTag = EXIF.getTag(file, 'Orientation')
          setOrientation(orientationTag)
        }
      })
    }
  }
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setErrorModalIsOpen(false)
    setFileId('')
    setOrientation(0)
    setMessage('')
    setIsRecording(false)
  }
  const fileInput = React.createRef()

  const isEmpty = str => {
    return str.replace(/^\s+|\s+$/g, '').length === 0
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const post = {
      channel_id: channel.id,
      message,
      file_ids: fileId !== '' ? [fileId] : null,
    }
    if ((message && !isEmpty(message)) || fileId !== '') {
      await createPost(post)
      setFileId('')
    }
    setMessage('')
    setModalIsOpen(false)
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }
  const addFile = async e => {
    setIsUploading(true)
    const channelId = channel.id
    const data = new FormData()
    getExifData(e.target.files[0])
    const file = e.target.files[0]
    e.target.value = ''
    data.append('files', file)
    data.append('channel_id', channelId)
    if (file.size > 50000000) {
      setErrorModalIsOpen(true)
    } else {
      setModalIsOpen(true)
      const res = await uploadFile(channelId, null, null, data)
      const id =
        res && res.data && res.data.file_infos && res.data.file_infos[0].id
      setFileId(id)
      setIsUploading(false)
    }
  }

  const startSendingAudio = () => {
    setIsRecording(true)
    setModalIsOpen(true)
  }

  const handleAudioSubmit = async audioFile => {
    setIsRecording(false)
    const data = new FormData()
    data.append('files', audioFile)
    data.append('channel_id', channel.id)
    const res = await uploadFile(channel.id, null, null, data)
    const id = res && res.data.file_infos[0].id
    const post = {
      channel_id: channel.id,
      message: '',
      file_ids: [id],
    }
    await createPost(post)
  }

  const clickFileInput = () => {
    fileInput.current.click()
  }

  return (
    <div className="chat-user-input-wrapper">
      <form onSubmit={handleSubmit} className="chat-user-input-content">
        <TextareaAutosize
          className="chat-user-input-text-field"
          id="message"
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Kirjoita viesti"
          maxRows={3}
          rows={1}
          aria-label="Kirjoita viesti"
        />
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*,video/*,video/mp4" // video/mp4 is for safari
          onChange={addFile}
          ref={fileInput}
          aria-label="Liitä tiedosto"
        />
        <div className="userinput-buttons">
          <ButtonContainer
            className="icon-btn"
            onClick={clickFileInput}
            label="Lähetä kuva tai video"
          >
            <div className="send-image-attachment-button" />
          </ButtonContainer>
          <ButtonContainer
            className="icon-btn"
            onClick={startSendingAudio}
            label="Lähetä ääniviesti"
          >
            <div className="send-voice-attachment-button" />
          </ButtonContainer>
          <button
            type="submit"
            className="send-message-button"
            tabIndex="0"
            aria-label="Lähetä viesti"
          >
            {}
          </button>
        </div>
      </form>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        label="image-preview-dialog"
        isLong
        className="image-preview-modal"
        overlayClassName="image-preview-modal-overlay"
      >
        {!isRecording && isUploading && !errorModalIsOpen && (
          <div>
            <ButtonContainer
              className="icon-btn go-back-button image-max-size-exceeded"
              onClick={closeModal}
              label="Sulje"
            >
              {' '}
            </ButtonContainer>
            <BouncingLoader />
            <p className="uploading-text">Ladataan...</p>
          </div>
        )}
        {!isRecording && !isUploading && (
          <FilePreview
            handleSubmit={handleSubmit}
            message={message}
            handleChange={handleChange}
            fileId={fileId}
            closeModal={closeModal}
            filesData={filesData}
            orientation={orientation}
            isUploading={isUploading}
          />
        )}
        {isRecording && (
          <AudioInput
            handleSubmit={handleAudioSubmit}
            closeModal={closeModal}
            isRecording={isRecording}
          />
        )}
      </ModalContainer>
      <ModalContainer
        modalIsOpen={errorModalIsOpen}
        label="Tiedosto on liian suuri"
        closeModal={closeModal}
      >
        <div>
          <p className="image-max-size-exceeded-text">
            Tiedosto on liian suuri!
          </p>
          <ButtonContainer
            className="icon-btn go-back-button image-max-size-exceeded"
            onClick={closeModal}
            label="Sulje"
          />
        </div>
      </ModalContainer>
    </div>
  )
}

UserInput.propTypes = {
  createPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  channel: PropTypes.instanceOf(Object).isRequired,
  filesData: PropTypes.instanceOf(Object).isRequired,
}

export default memo(UserInput)
