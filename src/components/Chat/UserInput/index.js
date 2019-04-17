import React, { useState } from 'react'
import './styles.scss'

const UserInput = props => {
  const { createPost, channel } = props
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(message)
    const post = {
      channel_id: channel.id,
      message: message,
    }
    createPost(post)
    setMessage('')
  }

  const handleChange = e => {
    setMessage(e.target.value)
  }

  return (
    <div>
      <form className="chat-input-field pos-absolute" onSubmit={handleSubmit}>
        <label>
          Viesti:
          <input type="text" value={message} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default UserInput
