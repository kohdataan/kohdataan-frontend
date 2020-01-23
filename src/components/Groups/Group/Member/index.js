import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Member = props => {
  const { nickname, iconColor, userId, currentUserId } = props
  const userFirstLetter = nickname[0]

  return (
    <div className="group-boxes-member" key={userId}>
      <div className="group-boxes-member-icon-wrapper">
        <i aria-hidden="true" title={userFirstLetter} />
        <span
          className="group-members-icon"
          style={{ backgroundColor: iconColor }}
        >
          {userFirstLetter}
        </span>
      </div>
      {currentUserId !== userId && <p>{nickname}</p>}
      {currentUserId === userId && (
        <div>
          <p>{nickname}</p>
        </div>
      )}
    </div>
  )
}

Member.propTypes = {
  userId: propTypes.string.isRequired,
  nickname: propTypes.string.isRequired,
  currentUserId: propTypes.string.isRequired,
  iconColor: propTypes.string.isRequired,
}

export default memo(Member)
