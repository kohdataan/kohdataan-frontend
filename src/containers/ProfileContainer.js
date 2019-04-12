import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadMe, getMe} from 'mattermost-redux/actions/users'
import Profile from '../components/Profile'
import EditButton from '../components/Profile/EditButton'

const ProfileContainer = (props) => {
  
  const profileRoute = '/muokkaa'

  useEffect(() => {
    props.getMe()
  }, [])

  return (
    <div>
      <Profile user={props.user} />
      <EditButton route={profileRoute} />
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentUserId = state.entities.users.currentUserId

  return {
      currentUserId: currentUserId,
      user: state.entities.users.profiles[currentUserId],
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadMe,
  getMe,
}, dispatch)

// export default GroupsContainer
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
