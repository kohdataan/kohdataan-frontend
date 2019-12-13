import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  joinChannel as joinChannelAction,
  getChannelMembers as getChannelMembersAction,
} from 'mattermost-redux/actions/channels'
import { getPosts as getPostsAction } from 'mattermost-redux/actions/posts'
import PropTypes from 'prop-types'
import { getUserByUsername } from '../api/user'
import Friends from '../components/Friends'
import { fetchFriendsPageData as fetchFriendsPageDataAction } from '../store/friends/friendsAction'

const FriendsContainer = props => {
  const {
    channels,
    currentUserId,
    myChannels,
    profiles,
    getPosts,
    getChannelMembers,
    fetchFriendsPageData,
    loading,
  } = props

  useEffect(() => {
    fetchFriendsPageData()
  }, [])

  // Get only direct channels
  const getDirectChannels = allChannels => {
    const filteredChannels = Object.values(allChannels).filter(
      channel => channel.type === 'D'
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

  const getUsername = members => {
    if (members.length > 0) {
      const friend = members.find(member => member.user_id)
      const friendId = friend && friend.user_id
      const friendInfo =
        friendId &&
        Object.values(profiles).find(profile => profile.id === friendId)
      return friendInfo
    }
    return null
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

  const getLatestMessage = posts => {
    const postMap = posts && Object.values(posts)[1]
    console.log(postMap)
    if (postMap) {
      console.log('HERE')
      const postsArray = Object.values(postMap)
      postsArray.sort((a, b) => a.create_at - b.create_at).reverse()
      const messageObj = postsArray[0]
      const senderInfo =
        messageObj && messageObj.user_id === currentUserId ? 'Sinä: ' : ''
      return messageObj ? `${senderInfo}${postsArray[0].message}` : null
    }
    return null
  }

  if (loading) {
    // TODO: Better loader
    return <h1>Ladataan...</h1>
  }
  return (
    <>
      <Friends
        channels={getDirectChannels(getChannelInfoForMyChannels())}
        getMembers={getChannelMembers}
        getUnreadCount={getUnreadCountByChannelId}
        getUserByUsername={getUserByUsername}
        getUsername={getUsername}
        getPosts={getPosts}
        getLatestMessage={getLatestMessage}
      />
    </>
  )
}

FriendsContainer.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  myChannels: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  getPosts: PropTypes.func.isRequired,
  fetchFriendsPageData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const { channels } = state.entities.channels
  const { users } = state.entities
  const mmUser = users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannels = state.entities.channels.myMembers
  const { user } = state
  const channelSuggestions = state.channels.found
  const { loading } = state.friends

  return {
    currentUserId,
    channelSuggestions,
    user,
    mmUser,
    profiles,
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
      getPosts: getPostsAction,
      fetchFriendsPageData: fetchFriendsPageDataAction,
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
