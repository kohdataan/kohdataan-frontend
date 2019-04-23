import React, { useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

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
    return username.length ? username[0].username : null
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
          <div>
            <div className="chat-message-content" key={post[1]}>
              {post[3] && (
                <span className="chat-message-content-header">
                  {getUserNamebyId(post[3])}
                </span>
              )}
              <span>{post[2]}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  profiles: propTypes.instanceOf(Object).isRequired,
}

export default MessageList
