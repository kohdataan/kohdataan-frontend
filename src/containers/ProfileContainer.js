import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadMe, getMe} from 'mattermost-redux/actions/users'

const ProfileContainer = (props) => {
  useEffect(() => {
    //props.loadMe()
    props.getMe()
  }, [])

  return (
  <div>
      <div>Profiili</div>
      {props.user &&
        <div>
          <div>email: {props.user.email}</div>
          <div>käyttäjänimi: {props.user.username}</div>
        </div>
      }
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
