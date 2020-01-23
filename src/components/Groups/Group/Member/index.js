import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Member = props => {
  const { nickname, iconColor, userId, currentUserId, key } = props
  const userFirstLetter = nickname[0]

  return (
    currentUserId !== userId && (
      <div className="group-boxes-member" key={key}>
        <div className="group-boxes-member-icon-wrapper">
          <i aria-hidden="true" title={userFirstLetter} />
          <span
            className="group-members-icon"
            style={{ backgroundColor: iconColor }}
          >
            {userFirstLetter}
          </span>
        </div>
        <p>{nickname}</p>
      </div>
    )
  )
}

Member.propTypes = {
  userId: propTypes.string.isRequired,
  nickname: propTypes.string.isRequired,
  currentUserId: propTypes.string,
  iconColor: propTypes.string.isRequired,
}

Member.defaultProps = {
  currentUserId: '',
}

export default memo(Member)
