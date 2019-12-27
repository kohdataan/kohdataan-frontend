import React, { memo } from 'react'
import propTypes from 'prop-types'
import getAge from '../../../utils/getAge'
import './styles.scss'

const Header = props => {
  const { nickname, location, showAge, showLocation, birthdate } = props

  return (
    <div className="profile-header-item">
      <h3>{nickname}</h3>
      {showAge && <p>{`${getAge({ birthdate })} vuotta`}</p>}
      {showLocation && <p>{location}</p>}
    </div>
  )
}

Header.propTypes = {
  nickname: propTypes.string,
  location: propTypes.string,
  showAge: propTypes.bool,
  showLocation: propTypes.bool,
  birthdate: propTypes.string,
}

Header.defaultProps = {
  nickname: '',
  location: '',
  showAge: false,
  showLocation: false,
  birthdate: '',
}

export default memo(Header)
