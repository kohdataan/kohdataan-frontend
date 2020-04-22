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
    location,
    deleted,
  } = props

  const header = otherUser || channel.display_name
  const getHeader = () => {
    if (otherUser) return otherUser
    if (channel.name === 'town-square') return 'Kysy valvojalta'
    return channel.display_name
  }

  return (
    <header className="chat-header">
      <Link
        className="chat-header-item chat-header-nav-back-button"
        to={direct ? '/friends' : '/'}
      >
        {direct ? '< Kaverit' : '< Ryhmät'}
      </Link>
      {!direct && (
        <ButtonContainer onClick={toggleSider} className="channel-name-button">
          <h1 className="chat-header-item chat-header-channel-name">
            {getHeader()}
          </h1>
        </ButtonContainer>
      )}
      {direct && deleted === 0 && (
        <Link to={`/profile/${otherUserName}`} className="channel-name-link">
          {' '}
          <h1 className="chat-header-item chat-header-channel-name">
            {header}
          </h1>
        </Link>
      )}
      {direct && deleted !== 0 && (
        <div className="channel-header-deleted">
          {' '}
          <h1 className="chat-header-item chat-header-channel-name">
            Poistunut käyttäjä
          </h1>
        </div>
      )}
      <div className="chat-header-item">
        <BottomNavigationBot
          handleLogout={handleLogout}
          inChat
          direct={direct}
          path={location.pathname}
        />
      </div>
    </header>
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
  location: propTypes.instanceOf(Object).isRequired,
  deleted: propTypes.number,
}

Header.defaultProps = {
  otherUser: null,
  otherUserName: null,
  deleted: 0,
}

export default memo(Header)
