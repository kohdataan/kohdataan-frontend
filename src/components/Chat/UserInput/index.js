import React, { useState } from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

const UserInput = props => {
  const { createPost, channel } = props
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(message)
    const post = {
      channel_id: channel.id,
      message,
    }
    createPost(post)
    setMessage('')
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }

  return (
    <div>
      <form className="chat-user-input" onSubmit={handleSubmit}>
        <label htmlFor="message">
          Viesti:
          <input
            id="message"
            type="text"
            value={message}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

UserInput.propTypes = {
  createPost: PropTypes.func.isRequired,
  channel: PropTypes.instanceOf(Object).isRequired,
}

export default UserInput
