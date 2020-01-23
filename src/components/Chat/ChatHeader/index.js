import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonContainer from '../../ButtonContainer'
import BottomNavigationBot from '../../BottomNavigationBot'

const Header = props => {
  const {
    channel,
    toggleSider,
    otherUser,
    direct,
    handleLogout,
    otherUserName,
  } = props

  const header = otherUser || channel.display_name
  const getHeader = () => {
    if (otherUser) return otherUser
    if (channel.name === 'town-square') return 'Palaute'
    return channel.display_name
  }

  return (
    <div className="chat-header">
      <Link
        className="chat-header-item chat-header-nav-back-button"
        to={direct ? '/friends' : '/'}
      >
        {'< Takaisin'}
      </Link>
      {!direct && (
        <ButtonContainer onClick={toggleSider} className="channel-name-button">
          <h1 className="chat-header-item chat-header-channel-name">
            {getHeader()}
          </h1>
        </ButtonContainer>
      )}
      {direct && (
        <Link to={`/profile/${otherUserName}`} className="channel-name-link">
          {' '}
          <h1 className="chat-header-item chat-header-channel-name">
            {header}
          </h1>
        </Link>
      )}
      <div className="chat-header-item">
        <BottomNavigationBot
          handleLogout={handleLogout}
          inChat
          direct={direct}
        />
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
  otherUser: propTypes.instanceOf(Object),
  handleLogout: propTypes.func.isRequired,
  direct: propTypes.bool.isRequired,
  otherUserName: propTypes.string,
}

Header.defaultProps = {
  otherUser: null,
  otherUserName: null,
}

export default memo(Header)
