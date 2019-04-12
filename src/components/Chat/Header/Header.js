import React from 'react'
import './styles.scss'

const Header = props => {
  const { channel } = props

  return (
    <div>
        <h3>{ channel && channel.display_name}</h3>
    </div>
  )
}

export default Header