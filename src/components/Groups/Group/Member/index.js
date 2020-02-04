import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Member = props => {
  const { nickname, iconColor, userId, currentUserId, key } = props
  const userFirstLetter = nickname[0]

  const getTruncatedName = name => {
    let visibleName = name
    if (visibleName && visibleName.length >= 6) {
      visibleName = `${visibleName.substring(0, 6)}...`
    }
    return visibleName
  }

  return (
    currentUserId !== userId && (
      <div className="group-boxes-member" key={key}>
        <div className="group-boxes-member-icon-wrapper">
          <i aria-hidden="true" title={userFirstLetter} />
          <div
            className="label chat-message-sender-icon"
            style={{
              backgroundColor: iconColor,
              backgroundImage: `url(
                ${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${userId}/image
              )`,
            }}
          >
            {' '}
          </div>
        </div>
        <p>{getTruncatedName(nickname)}</p>
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
