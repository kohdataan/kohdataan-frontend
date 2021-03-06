import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts as getPostsAction } from 'mattermost-redux/actions/posts'
import { searchProfiles as searchProfilesAction } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import { updateUser as updateUserAction } from '../store/user/userAction'
import Friends from '../components/Friends'
import BouncingLoader from '../components/BouncingLoader'
import { fetchFriendsPageData as fetchFriendsPageDataAction } from '../store/friends/friendsAction'

const FriendsContainer = (props) => {
  const {
    channels,
    currentUserId,
    myChannels,
    profiles,
    getPosts,
    searchProfiles,
    fetchFriendsPageData,
    membersInChannel,
    updateUser,
    user,
    history,
    statuses,
  } = props

  if (!user.profileReady) history.push('/registration/info')

  const [directChannels, setDirectChannels] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initialFetch = async () => {
      await fetchFriendsPageData()
      setIsInitialized(true)
    }
    initialFetch()
  }, [fetchFriendsPageData])

  useEffect(() => {
    // Get channel objects based on myChannels
    const getChannelInfoForMyChannels = () =>
      Object.values(channels).filter((channel) =>
        Object.keys(myChannels).includes(channel.id)
      )
    // Get only direct channels with at least one message
    const getDirectChannels = (allChannels) =>
      Object.values(allChannels).filter(
        (channel) => channel.type === 'D' && channel.total_msg_count > 0
      )
    const channelInfo = getChannelInfoForMyChannels()
    // Set direct channel info
    setDirectChannels(getDirectChannels(channelInfo))
  }, [channels, myChannels])

  const getUsername = (members) => {
    if (members.length > 0) {
      const friend = members.find((member) => member.user_id !== currentUserId)
      const friendId = friend && friend.user_id
      const friendInfo =
        friendId &&
        Object.values(profiles).find((profile) => profile.id === friendId)
      return friendInfo
    }
    return null
  }
  // Get unread count by channel id
  const getUnreadCountByChannelId = (channelId) => {
    if (channels) {
      const channel = Object.values(channels).find(
        (item) => item.id === channelId
      )
      if (channel) {
        const channelMsgCount = channel.total_msg_count
        const myMessageCount = myChannels[channel.id].msg_count
        return channelMsgCount - myMessageCount
      }
    }
    return 0
  }

  const getLatestMessage = (posts) => {
    // TODO: Even better posts loading
    const postMap = posts && Object.values(posts)[1]
    if (postMap) {
      const postsArray = Object.values(postMap)
      postsArray.sort((a, b) => a.create_at - b.create_at).reverse()
      const messageObj = postsArray[0]
      const senderInfo =
        messageObj && messageObj.user_id === currentUserId ? 'Sinä: ' : ''
      return messageObj ? `${senderInfo}${postsArray[0].message}` : null
    }
    return null
  }

  if (!isInitialized) {
    return <BouncingLoader />
  }

  return (
    <main>
      <Friends
        channels={directChannels}
        getUnreadCount={getUnreadCountByChannelId}
        getUsername={getUsername}
        getPosts={getPosts}
        searchProfiles={searchProfiles}
        getLatestMessage={getLatestMessage}
        membersInChannel={membersInChannel}
        tutorialWatched={user.tutorialWatched}
        updateUser={updateUser}
        history={history}
        myUserInfo={user}
        statuses={statuses}
        currentUserId={currentUserId}
        profiles={profiles}
      />
    </main>
  )
}

FriendsContainer.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  myChannels: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
  getPosts: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  searchProfiles: PropTypes.func.isRequired,
  fetchFriendsPageData: PropTypes.func.isRequired,
  membersInChannel: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func.isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.entities.users
  const { channels } = state.entities.channels
  const { membersInChannel } = state.entities.channels
  const { users } = state.entities
  const mmUser = users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannels = state.entities.channels.myMembers
  const { user } = state
  const { statuses } = state.entities.users

  return {
    currentUserId,
    user,
    mmUser,
    profiles,
    posts,
    channels,
    members,
    myChannels,
    membersInChannel,
    statuses,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPosts: getPostsAction,
      searchProfiles: searchProfilesAction,
      fetchFriendsPageData: fetchFriendsPageDataAction,
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
)(memo(FriendsContainer, shouldComponentUpdate))
