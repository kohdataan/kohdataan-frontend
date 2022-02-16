import React, { memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const FriendSearch = (props) => {
  const { profileData, searchTerm } = props

  const imageUri =
    profileData && profileData.id
      ? `${process.env.REACT_APP_MATTERMOST_URL}/api/v4/users/${
          profileData.id
        }/image?${Date.now()}`
      : null

  if (
    profileData.delete_at === 0 &&
    // The default search includes emails and usernames, this way we filter away all others than nicknames.
    profileData.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return (
      <div className="found-profile-container">
        <Link
          className="found-profile-link"
          to={{
            pathname: `/profile/${profileData.username}`,
            state: {
              searchTerm,
            },
          }}
        >
          <div className="found-profile-icon-box">
            <img
              className="found-profile-icon"
              src={imageUri}
              alt="Profiilikuva"
            />
          </div>
          <div className="found-friend-messages-content">
            <div className="found-profile-name">
              <p>{profileData.nickname}</p>
            </div>
            <div className="arrow-image-container">
              <div className="fas fa-chevron-right" />
            </div>
          </div>
        </Link>
      </div>
    )
  }
  return null
}

FriendSearch.propTypes = {
  profileData: propTypes.instanceOf(Object).isRequired,
  searchTerm: propTypes.string.isRequired,
}

export default memo(FriendSearch)
