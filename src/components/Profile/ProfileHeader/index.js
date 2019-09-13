import React, { memo } from 'react'
import './styles.scss'
import {
  getMe,
  getProfiles as getProfilesAction,
  getProfilesInChannel as getProfilesInChannelAction,
} from 'mattermost-redux/actions/users'

const Header = props => {
  const { nickname, location, startDirect, currentUser } = props || ''

  return (
    <span className="profile-header-item">
      <h1>{nickname}</h1>
      {!currentUser && <button onClick={startDirect}>Aloita keskustelu</button>}
      <div>{location}</div>
    </span>
  )
}

export default memo(Header)
