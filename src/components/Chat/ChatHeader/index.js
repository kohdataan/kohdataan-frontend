import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'

const Header = props => {
  const { channel, hideChat } = props

  return (
    <div className="chat-header">
      <ButtonContainer
        className="chat-header-nav-back-button"
        onClick={hideChat}
      >
        {'< Takaisin'}
      </ButtonContainer>
      {channel && (
        <h1 className="chat-header-channel-name">{channel.display_name}</h1>
      )}
      <span>Group image</span>
    </div>
  )
}

Header.propTypes = {
  channel: propTypes.instanceOf(Object).isRequired,
  hideChat: propTypes.func.isRequired,
}

export default Header
