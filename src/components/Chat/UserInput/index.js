import React, { useState, memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import ModalContainer from '../../ModalContainer'
import ImagePreview from '../ImagePreview'
import './styles.scss'

const UserInput = props => {
  const { createPost, channel, uploadFile } = props
  const [message, setMessage] = useState('')
  const [fileId, setFileId] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
    setFileId(null)
    setMessage('')
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
      file_ids: fileId ? [fileId] : null,
    }
    if ((message && !isEmpty(message)) || fileId) {
      await createPost(post)
      setFileId(null)
    }
    setMessage('')
    setModalIsOpen(false)
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }
  const addImage = async e => {
    const channelId = channel.id
    const data = new FormData()
    data.append('files', e.target.files[0])
    data.append('channel_id', channelId)
    const res = await uploadFile(channelId, null, null, data)
    const id = res && res.data.file_infos[0].id
    setFileId(id)
    setModalIsOpen(true)
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
        />
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={addImage}
          ref={fileInput}
        />
        <icon
          onClick={clickFileInput}
          className="send-image-attachment-button"
          aria-labelledby="send-image-button"
        />
        <icon className="send-voice-attachment-button" />
        <input type="submit" value="➤" className="send-message-button" />
      </form>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        label="image-preview-dialog"
        className="image-preview-modal"
        overlayClassName="image-preview-modal-overlay"
      >
        <ImagePreview
          channel={channel}
          handleSubmit={handleSubmit}
          createPost={createPost}
          message={message}
          handleChange={handleChange}
          fileId={fileId}
          closeModal={closeModal}
        />
      </ModalContainer>
    </div>
  )
}

UserInput.propTypes = {
  createPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  channel: PropTypes.instanceOf(Object).isRequired,
}

export default memo(UserInput)
