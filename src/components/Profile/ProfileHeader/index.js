import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Header = (props) => {
  const { nickname, location, showAge, showLocation, birthdate } = props
  return (
    <div className="profile-header-item">
      <span className="sr-only">Käyttäjän nimi</span>
      <h1 className="profile-header-nickname">{nickname}</h1>
      {showAge && (
        <p className="profile-header-text">{`${birthdate} vuotta`}</p>
      )}
      {showLocation && <p className="profile-header-text">{location}</p>}
    </div>
  )
}

Header.propTypes = {
  nickname: propTypes.string,
  location: propTypes.string,
  showAge: propTypes.bool,
  showLocation: propTypes.bool,
  birthdate: propTypes.number,
}

Header.defaultProps = {
  nickname: '',
  location: '',
  showAge: false,
  showLocation: false,
  birthdate: null,
}

export default memo(Header)
