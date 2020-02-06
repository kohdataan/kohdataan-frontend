import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { addUserInterests as addUserInterestsAction } from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import EditInterests from '../components/EditInterests'

const EditInterestsContainer = props => {
  const { history, userInterests, interestOptions, addUserInterests } = props

  const handleEditReady = ids => {
    addUserInterests({ userInterests: ids })
  }

  const getCurrentIds = () => {
    return userInterests.map(item => item.id)
  }

  return (
    <EditInterests
      history={history}
      currentInterestIds={getCurrentIds()}
      handleInterestEditReady={handleEditReady}
      interestOptions={interestOptions}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { username } = ownProps.match.params
  const currentUser = state.entities.users.profiles[currentUserId]
  const userInterests = state.user.interests
  const interestOptions = state.interests.results

  return {
    currentUserId,
    currentUser,
    username,
    userInterests,
    interestOptions,
  }
}

EditInterestsContainer.propTypes = {
  history: PropTypes.instanceOf(Object),
  userInterests: PropTypes.instanceOf(Array),
  interestOptions: PropTypes.instanceOf(Array),
  addUserInterests: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

EditInterestsContainer.defaultProps = {
  history: {},
  userInterests: [],
  interestOptions: [],
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addUserInterests: addUserInterestsAction,
      getInterestsAction,
    },
    dispatch
  )
// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EditInterestsContainer, shouldComponentUpdate))
