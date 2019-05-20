import React from 'react'
import './styles.scss'

const Header = props => {
  const { username, location } = props || ''

  return (
    <span className="profile-header-item">
      <h1>{username}</h1>
      <div>{location}</div>
    </span>
  )
}

export default Header
