import React, { useState, memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import ModalContainer from '../../ModalContainer'
import FilePreview from '../FilePreview'
import AudioInput from '../AudioInput'
import './styles.scss'

const UserInput = props => {
  const { createPost, channel, uploadFile, filesData } = props
  const [message, setMessage] = useState('')
  const [fileId, setFileId] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setFileId('')
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
    const channelId = channel.id
    const data = new FormData()
    data.append('files', e.target.files[0])
    data.append('channel_id', channelId)
    const res = await uploadFile(channelId, null, null, data)
    const id = res && res.data.file_infos[0].id
    setFileId(id)
    setModalIsOpen(true)
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
          aria-label="add message"
        />
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*,video/*"
          onChange={addFile}
          ref={fileInput}
          aria-label="add image"
        />
        <ButtonContainer className="icon-btn" onClick={clickFileInput}>
          <div className="send-image-attachment-button" />
        </ButtonContainer>
        <ButtonContainer className="icon-btn" onClick={startSendingAudio}>
          <div className="send-voice-attachment-button" />
        </ButtonContainer>
        <button type="submit" className="send-message-button" tabIndex="0">
          {}
        </button>
      </form>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        label="image-preview-dialog"
        isLong={!isRecording}
        className="image-preview-modal"
        overlayClassName="image-preview-modal-overlay"
      >
        {!isRecording && (
          <FilePreview
            handleSubmit={handleSubmit}
            message={message}
            handleChange={handleChange}
            fileId={fileId}
            closeModal={closeModal}
            filesData={filesData}
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
