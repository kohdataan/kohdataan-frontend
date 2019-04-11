import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Chat = props => {
  const { channel, posts, createPost } = props
  const [ message, setMessage ] = useState('')

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(message)
      const post = {
          channel_id: channel.id,
          message: message,
      }
      createPost(post)
      setMessage('')
  }

  const handleChange = (e) => {
      setMessage(e.target.value)
  }

  return (
    <div>
        <h3>{ channel && channel.display_name}</h3>
        { posts.length > 0 && posts.map((post => 
            <li key={post[1]}>{post[2]}</li>
            ))
        }
        { channel &&
        <form onSubmit={handleSubmit}>
            <label>
                Viesti:
                <input type="text" value={message} onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>
        }
    </div>
  )
}

Chat.propTypes = {
  posts: PropTypes.instanceOf(Array).isRequired
}

export default Chat