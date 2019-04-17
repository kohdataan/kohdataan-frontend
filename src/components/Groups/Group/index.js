import React from 'react'
import './styles.scss'

const Group = props => {
  const { channel, clickHandler } = props

  return (
    <div className='group-box'>
        <h2 onClick={clickHandler(channel.id)}>{channel.display_name}</h2>
    </div>
    
  )
}

export default Group