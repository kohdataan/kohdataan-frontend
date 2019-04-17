import React, { useEffect } from 'react'
import './styles.scss'

const MessageList = props => {
  const { posts } = props
  let scrollList = React.createRef()

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight
  })

  return (
    <div
      className="chat-messages-box pos-absolute"
      ref={el => (scrollList = el)}
    >
      {posts.length > 0 && posts.map(post => <li key={post[1]}>{post[2]}</li>)}
    </div>
  )
}

export default MessageList
