import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Header = props => {
  const { nickname, location } = props
  return (
    <div className="profile-header-item">
      <h3>{nickname}</h3>
      <div>{location}</div>
    </div>
  )
}

Header.propTypes = {
  nickname: propTypes.string,
  location: propTypes.string,
}

Header.defaultProps = {
  nickname: '',
  location: '',
}

export default memo(Header)
