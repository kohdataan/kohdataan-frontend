import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const Message = props => {
  const { sender, text } = props
  return (
    <div className="chat-message-wrapper">
      <span className="chat-message-sender-icon">{sender[0]}</span>
      <div className="chat-message-content">
        <span className="chat-message-content-header">{sender}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  sender: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
}

export default Message
