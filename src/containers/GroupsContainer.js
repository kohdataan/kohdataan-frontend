import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadMe as loadMeAction,
  getProfiles as getProfilesAction,
  getProfilesInChannel as getProfilesInChannelAction,
} from 'mattermost-redux/actions/users'
import {
  fetchMyChannelsAndMembers as fetchChannelsAndMembersAction,
  joinChannel as joinChannelAction,
  getChannelMembers as getChannelMembersAction,
} from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import getChannelInvitationsAction from '../store/channels/channelAction'
import { getChannelInvitationMembers } from '../api/channels'
import Groups from '../components/Groups'
import GroupSuggestions from '../components/GroupSuggestions'
import { updateUnreadCount as updateUnreadCountAction } from '../store/chat/chatReducer'

const GroupsContainer = props => {
  const {
    channels,
    teams,
    loadMe,
    getProfiles,
    fetchMyChannelsAndMembers,
    users,
    currentUserId,
    myChannels,
    joinChannel,
    channelSuggestions,
    getChannelInvitations,
    getChannelMembers,
    updateUnreadCount,
  } = props

  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  // Get user profiles and current user's teams at initial render
  useEffect(() => {
    getProfiles()
    loadMe()
    getChannelInvitations()
  }, [])

  // Get only those channels suggestions that user has not yet joined
  const getFilteredChannelSuggestions = () => {
    const mySuggestions = channelSuggestions.filter(
      channel => !Object.keys(myChannels).includes(channel.id)
    )
    return mySuggestions
  }

  // Get channels and members based on team id
  // & When user joins a channel, users props is changed and
  // channels need to be fetched again
  useEffect(() => {
    const teamId = Object.keys(teams)[0]
    if (teamId) {
      fetchMyChannelsAndMembers(teamId)
    }
    if (myChannels) {
      setFilteredSuggestions(getFilteredChannelSuggestions())
    }
  }, [teams, users])

  // Get only group channels
  // (filter direct messages and default channels out)
  const getGroupChannels = allChannels => {
    const filteredChannels = Object.values(allChannels).filter(
      channel =>
        channel.type !== 'D' &&
        channel.name !== 'off-topic' &&
        channel.name !== 'town-square'
    )
    return filteredChannels
  }

  const getMembersByChannelId = async (channelId, signal) => {
    try {
      const res = await getChannelInvitationMembers(
        localStorage.getItem('authToken'),
        channelId,
        signal
      )
      if (res.userDetails) {
        return res.userDetails
      }
      return []
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      return []
    }
  }

  // Get channel objects based on myChannels
  const getChannelInfoForMyChannels = () => {
    const myCurrentChannels = Object.values(channels).filter(channel =>
      Object.keys(myChannels).includes(channel.id)
    )
    return myCurrentChannels
  }

  const handleJoinChannel = channelId => () => {
    const currentTeamId = Object.keys(teams)[0]
    joinChannel(currentUserId, currentTeamId, channelId)
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
        updateUnreadCount(channelMsgCount - myMessageCount)
        return channelMsgCount - myMessageCount
      }
    }
    return 0
  }

  return (
    <>
      <GroupSuggestions
        channels={filteredSuggestions}
        handleJoinChannel={handleJoinChannel}
        getMembersByChannelId={getMembersByChannelId}
      />
      <Groups
        channels={getGroupChannels(getChannelInfoForMyChannels())}
        getMembers={getChannelMembers}
        getUnreadCount={getUnreadCountByChannelId}
      />
    </>
  )
}

GroupsContainer.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  myChannels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  users: PropTypes.instanceOf(Object).isRequired,
  loadMe: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
  joinChannel: PropTypes.func.isRequired,
  channelSuggestions: PropTypes.instanceOf(Array),
  currentUserId: PropTypes.string.isRequired,
  getChannelInvitations: PropTypes.func.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  updateUnreadCount: PropTypes.func.isRequired,
}

GroupsContainer.defaultProps = {
  channelSuggestions: [],
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

  return {
    currentUserId,
    channelSuggestions,
    users,
    user,
    mmUser,
    profiles,
    teams,
    posts,
    channels,
    members,
    myChannels,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
      getProfiles: getProfilesAction,
      getProfilesInChannel: getProfilesInChannelAction,
      loadMe: loadMeAction,
      joinChannel: joinChannelAction,
      getChannelInvitations: getChannelInvitationsAction,
      getChannelMembers: getChannelMembersAction,
      updateUnreadCount: updateUnreadCountAction,
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
