import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  joinChannel as joinChannelAction,
  getChannelMembers as getChannelMembersAction,
} from 'mattermost-redux/actions/channels'
import { getPosts as getPostsAction } from 'mattermost-redux/actions/posts'
import PropTypes from 'prop-types'
import moment from 'moment'
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
import { isSystemAdmin, isTeamAdmin } from '../utils/userIsAdmin'

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
    profiles,
    user,
    updateUser,
    getPosts,
    posts,
  } = props

  if (!user.profileReady) history.push('/registration/info')

  const [isInitialized, setIsInitialized] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showTownSquare, setShowTownSquare] = useState(false)
  const [showThemeGroup, setShowThemeGroup] = useState(false)
  const [activeMemberMmProfiles, setActiveMemberMmProfiles] = useState([])
  const [timer, setTimer] = useState(0)
  // Get only those channels suggestions that user has not yet joined

  // Get all group related data at once
  useEffect(() => {
    const initialize = async () => {
      await fetchChannelsAndInvitations()
      setIsInitialized(true)
    }
    initialize()
  }, [fetchChannelsAndInvitations])

  const updateThemeGroupOpen = () => {
    const dateObject = moment()
    const format = 'DD MM YYYY, hh:mm:ss'
    const startTime1 = moment('26 01 2021, 18:00:00', format)
    const endTime1 = moment('26 01 2021, 20:00:00', format)
    const startTime2 = moment('04 02 2021, 18:00:00', format)
    const endTime2 = moment('04 02 2021, 20:00:00', format)
    const startTime3 = moment('12 02 2021, 12:00:00', format)
    const endTime3 = moment('12 02 2021, 14:00:00', format)
    if (dateObject.isBetween(startTime1, endTime1)) {
      setShowThemeGroup(true)
    } else if (dateObject.isBetween(startTime2, endTime2)) {
      setShowThemeGroup(true)
    } else if (dateObject.isBetween(startTime3, endTime3)) {
      setShowThemeGroup(true)
    } else {
      setShowThemeGroup(false)
    }
    if (timer > 100000) {
      setTimer(0)
    } else {
      setTimer(timer + 1)
    }
  }

  const updateTownSquareOpen = () => {
    const dateObject = moment()
    const weekday = dateObject.isoWeekday()
    const format = 'hh:mm:ss'
    const beforeTime = moment('09:00:00', format)
    const afterTime = moment('21:00:00', format)
    if (dateObject.isBetween(beforeTime, afterTime)) {
      setShowTownSquare(true)
    } else if (!dateObject.isBetween(beforeTime, afterTime)) {
      setShowTownSquare(false)
    }
    // checks if weekday is Saturday (6) or Sunday (7)
    if (weekday === 6 || weekday === 7) setShowTownSquare(false)
    if (timer > 100000) {
      setTimer(0)
    } else {
      setTimer(timer + 1)
    }
  }

  // checks if public groups are open or closed on first render
  useEffect(() => {
    updateTownSquareOpen()
    updateThemeGroupOpen()
  }, [])

  // check every ten seconds if townsquare and theme group should be shown or not
  useEffect(() => {
    const checkTime = setTimeout(updateTownSquareOpen, 10000)
    return () => clearTimeout(checkTime)
  }, [timer])

  useEffect(() => {
    const checkTime = setTimeout(updateThemeGroupOpen, 10000)
    return () => clearTimeout(checkTime)
  }, [timer])

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
      channel => channel.type !== 'D'
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

  useEffect(() => {
    const getActiveMattermostProfiles = () => {
      const activeProfilesArr =
        profiles &&
        Object.values(profiles)
          .map(member => profiles[member.id])
          .filter(member => member && member.delete_at === 0)
          .filter(member => member.position !== 'deleted')
          .filter(member => member.username !== 'surveybot')
          .filter(
            member =>
              !isSystemAdmin(member.id, profiles) &&
              !isTeamAdmin(member.id, teams)
          )
      setActiveMemberMmProfiles(activeProfilesArr)
    }
    getActiveMattermostProfiles()
  }, [profiles, setActiveMemberMmProfiles, teams])

  if (!isInitialized) {
    return <BouncingLoader />
  }

  // TODO: Refactor channel member fetching
  return (
    <main>
      <GroupSuggestions
        channels={filteredSuggestions}
        joinedChannels={getGroupChannels(getChannelInfoForMyChannels())}
        handleJoinChannel={handleJoinChannel}
        channelMembers={channelSuggestionMembers}
        getChannelInvitations={getInvitationsAgain}
        resetChannelInvitations={resetChannelInvitations}
        profiles={activeMemberMmProfiles}
        teams={teams}
      />
      <Groups
        history={history}
        channels={getGroupChannels(getChannelInfoForMyChannels())}
        getMembers={getChannelMembers}
        profiles={activeMemberMmProfiles}
        getUnreadCount={getUnreadCountByChannelId}
        currentUserId={currentUserId}
        updateUser={updateUser}
        tutorialWatched={user.tutorialWatched}
        teams={teams}
        getPosts={getPosts}
        posts={posts}
        showTownSquare={showTownSquare}
        showThemeGroup={showThemeGroup}
        setShowThemeGroup={setShowThemeGroup}
      />
    </main>
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
  posts: PropTypes.instanceOf(Object).isRequired,
  getPosts: PropTypes.func.isRequired,
}

GroupsContainer.defaultProps = {
  channelSuggestions: [],
  channelSuggestionMembers: {},
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities
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
      getPosts: getPostsAction,
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
