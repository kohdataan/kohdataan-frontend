import React, { useState, memo } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'
import './styles.scss'

const UserInput = props => {
  const { createPost, channel, uploadFile, currentUserId } = props
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const fileInput = React.createRef()
  const isEmpty = str => {
    return str.replace(/^\s+|\s+$/g, '').length === 0
  }
  const handleSubmit = e => {
    e.preventDefault()
    const post = {
      channel_id: channel.id,
      message,
    }
    if (message && !isEmpty(message) && type === 'text') {
      createPost(post)
    } else if (type === 'image') {
      const imagePost = {
        channel_id: channel.id,
        message,
        url: true,
      }
      console.log('image post ', imagePost)
      // createPost(imagePost, file.id)
      setFile(null)
    }
    setType('')
    setMessage('')
  }

  const handleChange = e => {
    setMessage(e.target.value)
    setType('text')
  }
  const addImage = e => {
    setFile(e.target.files[0])
    setType('image')
    setMessage('')
    setUrl(URL.createObjectURL(e.target.files[0]))
    const channelId = channel.id
    const data = new FormData()
    data.append('channel_id', channelId)
    data.append('files', e.target.files[0])
    data.append('client_ids', [currentUserId])
    try {
      uploadFile(
        channelId,
        '',
        [currentUserId],
        data,
        '----WebKitFormBoundary5a5WIBBw6R9BjHO7'
      ).then(res => console.log(res))
    } catch (error) {
      console.log(error)
    }
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
        <input type="button" onClick={clickFileInput} value="Pick file" />
        <input type="submit" value="➤" className="send-message-button" />
      </form>
    </div>
  )
}

UserInput.propTypes = {
  createPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  channel: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
}

export default memo(UserInput)
