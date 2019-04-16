import React from 'react'
import './styles.scss'

const Group = props => {
  const { channel, clickHandler } = props

  return (
    <div>
        <button onClick={clickHandler(channel.id)}>{channel.display_name}</button>
    </div>
  )
}

export default Group