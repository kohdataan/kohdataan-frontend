import React from 'react'
import './styles.scss'

const Header = props => {
  const { username } = props

  return (
    <div>
        <h1 className="profile-header">{username}</h1>
        <h2 className="profile-info-text">26 vuotta</h2>
    </div>
  )
}

export default Header