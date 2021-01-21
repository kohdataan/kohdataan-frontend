import React, { memo, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const Member = props => {
  const { nickname, iconColor, userId, currentUserId } = props
  const userFirstLetter = nickname[0]
  const [image, setImage] = useState(null)

  useEffect(() => {
    const getMemberImage = () => {
      const url = `${
        process.env.REACT_APP_MATTERMOST_URL
      }/api/v4/users/${userId}/image?${Date.now()}`
      setImage(url)
    }
    getMemberImage()
  }, [userId])

  return (
    currentUserId !== userId && (
      <div className="group-boxes-member">
        <div className="group-boxes-member-icon-wrapper">
          <i aria-hidden="true" title={userFirstLetter} />
          <div
            className="label chat-message-sender-icon"
            style={{
              backgroundColor: iconColor,
              backgroundImage: `url(${image})`,
            }}
          >
            {' '}
          </div>
        </div>
        <p className="suggestion-box-nickname">{nickname}</p>
      </div>
    )
  )
}

Member.propTypes = {
  userId: propTypes.string.isRequired,
  iconColor: propTypes.string,
  nickname: propTypes.string.isRequired,
  currentUserId: propTypes.string,
}

Member.defaultProps = {
  currentUserId: '',
  iconColor: null,
}

export default memo(Member)
