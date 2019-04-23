import React, { useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Message from './Message'

const MessageList = props => {
  const { posts, profiles } = props
  let scrollList = React.createRef()

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight
  })

  const getUserNamebyId = id => {
    const username = Object.values(profiles).filter(
      profile => profile.id === id
    )
    return username.length ? username[0].username : ''
  }

  return (
    <div
      className="chat-message-list-container"
      ref={el => {
        scrollList = el
      }}
    >
      {posts.length > 0 &&
        posts.map(post => (
          <Message
            key={post[1]}
            sender={getUserNamebyId(post[3])}
            text={post[2]}
          />
        ))}
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
}

export default MessageList
