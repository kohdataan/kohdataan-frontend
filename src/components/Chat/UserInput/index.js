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

const UserInput = (props) => {
  const { createPost, channel, uploadFile, filesData } = props
  const [message, setMessage] = useState('')
  const [fileId, setFileId] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false)
  const [orientation, setOrientation] = useState(0)
  const [showAudioModal, setShowAudioModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showFilePreview, setShowFilePreview] = useState(false)

  const getExifData = (file) => {
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

  const closeModal = () => {
    setModalIsOpen(false)
    setErrorModalIsOpen(false)
    setFileId('')
    setOrientation(0)
    setMessage('')
    setIsUploading(false)
    setShowAudioModal(false)
    setShowFilePreview(false)
  }
  const fileInput = React.createRef()

  const isEmpty = (str) => {
    return str.replace(/^\s+|\s+$/g, '').length === 0
  }
  const handleSubmit = async (e, msg) => {
    e.preventDefault()
    let messageToUse = msg
    if (msg === '' || msg === undefined) {
      messageToUse = message
    }
    const post = {
      channel_id: channel.id,
      message: messageToUse,
      file_ids: fileId !== '' ? [fileId] : null,
    }
    if ((message && !isEmpty(message)) || fileId !== '') {
      await createPost(post)
      setFileId('')
    }
    setMessage('')
    setModalIsOpen(false)
    setShowFilePreview(false)
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const addFile = async (e) => {
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
      setShowFilePreview(true)
    }
  }

  const startSendingAudio = () => {
    setShowAudioModal(true)
    setModalIsOpen(true)
  }

  const handleAudioSubmit = async (audioFile) => {
    setShowAudioModal(false)
    setIsUploading(true)
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
    setIsUploading(false)
    setModalIsOpen(false)
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
            disabled={showAudioModal || isUploading}
          >
            <div className="send-image-attachment-button" />
          </ButtonContainer>
          <ButtonContainer
            className="icon-btn"
            disabled={showFilePreview || isUploading}
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
        label={!showAudioModal ? 'Esikatselu' : 'Ääniviestin lähetys'}
        className="image-preview-modal"
        overlayClassName="image-preview-modal-overlay"
      >
        {!showAudioModal && isUploading && !errorModalIsOpen && (
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
        {showFilePreview && (
          <FilePreview
            handleSubmit={handleSubmit}
            message={message}
            handleChange={setMessage}
            fileId={fileId}
            closeModal={closeModal}
            filesData={filesData}
            orientation={orientation}
            isUploading={isUploading}
          />
        )}
        {showAudioModal && (
          <AudioInput
            handleSubmit={handleAudioSubmit}
            closeModal={closeModal}
            showAudioModal={showAudioModal}
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
