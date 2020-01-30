import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  joinChannel as joinChannelAction,
  getChannelMembers as getChannelMembersAction,
} from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import { addUserInterestsToChannelPurpose } from '../api/channels/channels'
import Groups from '../components/Groups'
import GroupSuggestions from '../components/GroupSuggestions'
import BouncingLoader from '../components/BouncingLoader'
import {
  fetchChannelsAndInvitations as fetchChannelsAndInvitationsAction,
  getChannelInvitationsAction as getChannelInvitationsAgain,
  resetChannelInvitations as resetChannelInvitationsAction,
} from '../store/channels/channelAction'
import { updateUser as updateUserAction } from '../store/user/userAction'

const GroupsContainer = props => {
  const {
    history,
    channels,
    teams,
    channelSuggestionMembers,
    currentUserId,
    myChannels,
    joinChannel,
    channelSuggestions,
    getChannelMembers,
    fetchChannelsAndInvitations,
    getInvitationsAgain,
    resetChannelInvitations,
    groupsCoordinates,
    profiles,
    user,
    updateUser,
  } = props

  const [isInitialized, setIsInitialized] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  // Get only those channels suggestions that user has not yet joined

  // Get all group realated data at once
  useEffect(() => {
    const initialize = async () => {
      await fetchChannelsAndInvitations()
      setIsInitialized(true)
    }
    initialize()
  }, [fetchChannelsAndInvitations])

  useEffect(() => {
    const getFilteredChannelSuggestions = () => {
      const mySuggestions = channelSuggestions.filter(
        channel =>
          channel && channel.id && !Object.keys(myChannels).includes(channel.id)
      )
      return mySuggestions
    }
    if (myChannels) {
      setFilteredSuggestions([...getFilteredChannelSuggestions()])
    }
  }, [myChannels, channelSuggestions])

  // Get only group channels
  // (filter direct messages and default channels out)
  const getGroupChannels = allChannels => {
    const filteredChannels = Object.values(allChannels).filter(
      channel => channel.type !== 'D' && channel.name !== 'off-topic'
    )
    return filteredChannels
  }

  // Get channel objects based on myChannels
  const getChannelInfoForMyChannels = () => {
    const myCurrentChannels = Object.values(channels).filter(channel =>
      Object.keys(myChannels).includes(channel.id)
    )
    return myCurrentChannels
  }

  const handleJoinChannel = channelId => async () => {
    try {
      await addUserInterestsToChannelPurpose(
        localStorage.getItem('authToken'),
        channelId
      )
      const currentTeamId = Object.keys(teams)[0]
      await joinChannel(currentUserId, currentTeamId, channelId)
      history.push(`/chat/${channelId}`)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  // Get unread count by channel id
  const getUnreadCountByChannelId = channelId => {
    if (channels) {
      const channel = Object.values(channels).find(
        item => item.id === channelId
      )
      if (channel) {
        const channelMsgCount = channel.total_msg_count
        const myMessageCount = myChannels[channel.id].msg_count
        return channelMsgCount - myMessageCount
      }
    }
    return 0
  }
  if (!isInitialized) {
    return <BouncingLoader />
  }
  // TODO: Refactor channel member fetching
  return (
    <>
      <GroupSuggestions
        channels={filteredSuggestions}
        handleJoinChannel={handleJoinChannel}
        channelMembers={channelSuggestionMembers}
        getChannelInvitations={getInvitationsAgain}
        resetChannelInvitations={resetChannelInvitations}
      />
      <Groups
        channels={getGroupChannels(getChannelInfoForMyChannels())}
        getMembers={getChannelMembers}
        profiles={profiles}
        getUnreadCount={getUnreadCountByChannelId}
        currentUserId={currentUserId}
        updateUser={updateUser}
        tutorialWatched={user.tutorialWatched}
        groupsCoordinates={groupsCoordinates}
      />
    </>
  )
}

GroupsContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  channels: PropTypes.instanceOf(Object).isRequired,
  myChannels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  joinChannel: PropTypes.func.isRequired,
  channelSuggestions: PropTypes.instanceOf(Array),
  currentUserId: PropTypes.string.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  channelSuggestionMembers: PropTypes.instanceOf(Object),
  fetchChannelsAndInvitations: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  getInvitationsAgain: PropTypes.func.isRequired,
  resetChannelInvitations: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func.isRequired,
  groupsCoordinates: PropTypes.instanceOf(Object).isRequired,
}

GroupsContainer.defaultProps = {
  channelSuggestions: [],
  channelSuggestionMembers: {},
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities.teams
  const { channels } = state.entities.channels
  const { users } = state.entities
  const mmUser = users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannels = state.entities.channels.myMembers
  const { user } = state
  const channelSuggestions = state.channels.found
  const channelSuggestionMembers = state.channels.members
  const groupsCoordinates =
    state.loading.coordinates && state.loading.coordinates.groupsNav

  return {
    currentUserId,
    channelSuggestions,
    channelSuggestionMembers,
    user,
    mmUser,
    profiles,
    teams,
    posts,
    channels,
    members,
    myChannels,
    groupsCoordinates,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      joinChannel: joinChannelAction,
      getChannelMembers: getChannelMembersAction,
      fetchChannelsAndInvitations: fetchChannelsAndInvitationsAction,
      getInvitationsAgain: getChannelInvitationsAgain,
      resetChannelInvitations: resetChannelInvitationsAction,
      updateUser: updateUserAction,
    },
    dispatch
  )

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(GroupsContainer, shouldComponentUpdate))
