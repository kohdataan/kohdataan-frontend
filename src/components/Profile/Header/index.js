import React from 'react'
import './styles.scss'

const Header = props => {
  const { username } = props

  return (
    <span className="flex-item">
        <h1>{username}</h1>
        <div>28 vuotta</div>
    </span>
  )
}

export default Header