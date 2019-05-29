import React, { memo } from 'react'
import './styles.scss'

const Header = props => {
  const { nickname, location } = props || ''

  return (
    <span className="profile-header-item">
      <h1>{nickname}</h1>
      <div>{location}</div>
    </span>
  )
}

export default memo(Header)
