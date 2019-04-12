import React from 'react'
import './styles.scss'

const MessageList = props => {
    const { posts } = props

    return (
        <div className="chat-messages-box pos-absolute">
            { posts.length > 0 && posts.map((post => 
                <li key={post[1]}>{post[2]}</li>
                ))
            }
        </div>
      )
}
  
export default MessageList