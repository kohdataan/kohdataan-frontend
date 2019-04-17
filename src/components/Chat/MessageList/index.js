import React, { useEffect } from 'react'
import './styles.scss'
import propTypes from 'prop-types'

const MessageList = props => {
  const { posts } = props
  let scrollList = React.createRef()

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight
  })

  return (
    <div
      className="chat-message-list"
      ref={el => {
        scrollList = el
      }}
    >
      {posts.length > 0 && posts.map(post => <li key={post[1]}>{post[2]}</li>)}
    </div>
  )
}

MessageList.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
}

export default MessageList
