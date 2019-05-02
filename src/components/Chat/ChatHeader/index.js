import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../ButtonContainer'

const Header = props => {
  const { channel, toggleSider } = props

  return (
    <div className="chat-header">
      <Link
        className="chat-header-item chat-header-nav-back-button "
        to="/ryhmat"
      >
        {'< Takaisin'}
      </Link>
      <h1 className="chat-header-item chat-header-channel-name">
        {channel.display_name}
      </h1>
      <div className="chat-header-item">
        <ButtonContainer
          className=" chat-header-group-img-button"
          onClick={toggleSider}
        >
          Group img
        </ButtonContainer>
      </div>
    </div>
  )
}

Header.defaultProps = {
  channel: {},
}
Header.propTypes = {
  channel: propTypes.instanceOf(Object),
  toggleSider: propTypes.func.isRequired,
}

export default Header
