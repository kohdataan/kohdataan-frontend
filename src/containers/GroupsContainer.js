import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  joinChannel as joinChannelAction,
  getChannelMembers as getChannelMembersAction,
} from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import Groups from '../components/Groups'
import GroupSuggestions from '../components/GroupSuggestions'
import BouncingLoader from '../components/BouncingLoader'
import { fetchChannelsAndInvitations as fetchChannelsAndInvitationsAction } from '../store/channels/channelAction'

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
    loading,
    fetchChannelsAndInvitations,
  } = props

  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [visibleSuggestion, setVisibleSuggestion] = useState({})
  // Get only those channels suggestions that user has not yet joined

  // Get group realated data
  useEffect(() => {
    fetchChannelsAndInvitations()
  }, [fetchChannelsAndInvitations])

  useEffect(() => {
    const getFilteredChannelSuggestions = () => {
      const mySuggestions = channelSuggestions.filter(
        channel => !Object.keys(myChannels).includes(channel.id)
      )
      return mySuggestions
    }
    if (myChannels) {
      setFilteredSuggestions(getFilteredChannelSuggestions())
    }
  }, [myChannels, channelSuggestions])

  useEffect(() => {
    // initially take first suggestion from array
    setVisibleSuggestion(filteredSuggestions[0])
  }, [filteredSuggestions])

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

  // Get channel objects based on myChannels
  const getChannelInfoForMyChannels = () => {
    const myCurrentChannels = Object.values(channels).filter(channel =>
      Object.keys(myChannels).includes(channel.id)
    )
    return myCurrentChannels
  }

  const handleJoinChannel = channelId => async () => {
    const currentTeamId = Object.keys(teams)[0]
    await joinChannel(currentUserId, currentTeamId, channelId)
    history.push(`/chat/${channelId}`)
  }

  const handleSkipChannel = () => {
    // Cycle suggestions array
    const currentIndex = filteredSuggestions.indexOf(visibleSuggestion)
    console.log('current index', currentIndex)
    const nextIndex = (currentIndex + 1) % filteredSuggestions.length
    console.log('next index', nextIndex)
    const nextItem = filteredSuggestions[nextIndex]
    setVisibleSuggestion(nextItem)
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
  if (loading) {
    return <BouncingLoader />
  }
  // TODO: Refactor channel member fetching
  return (
    <>
      <GroupSuggestions
        channels={filteredSuggestions}
        handleJoinChannel={handleJoinChannel}
        handleSkipChannel={handleSkipChannel}
        channelMembers={channelSuggestionMembers}
        visibleSuggestion={visibleSuggestion}
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
  history: PropTypes.instanceOf(Object).isRequired,
  channels: PropTypes.instanceOf(Object).isRequired,
  myChannels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  joinChannel: PropTypes.func.isRequired,
  channelSuggestions: PropTypes.instanceOf(Array),
  currentUserId: PropTypes.string.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  channelSuggestionMembers: PropTypes.instanceOf(Object),
  fetchChannelsAndInvitations: PropTypes.func.isRequired,
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
  const { loading } = state.channels
  const channelSuggestionMembers = state.channels.members

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
    loading,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      joinChannel: joinChannelAction,
      getChannelMembers: getChannelMembersAction,
      fetchChannelsAndInvitations: fetchChannelsAndInvitationsAction,
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
