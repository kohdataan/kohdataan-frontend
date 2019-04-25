import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = props => {
  const { channel } = props

  return (
    <div className="chat-header">
      <Link className="chat-header-nav-back-button" to="/ryhmat">
        {'< Takaisin'}
      </Link>
      <h1 className="chat-header-channel-name">{channel.display_name}</h1>
      <span>Group image</span>
    </div>
  )
}

Header.defaultProps = {
  channel: {},
}
Header.propTypes = {
  channel: propTypes.instanceOf(Object),
}

export default Header
