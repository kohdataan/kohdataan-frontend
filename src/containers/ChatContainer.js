import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
} from 'mattermost-redux/actions/posts'
import {
  loadMe as loadMeAction,
  getProfiles as getProfilesAction,
  getProfilesInChannel as getProfilesInChannelAction,
} from 'mattermost-redux/actions/users'
import {
  removeChannelMember as removeChannelMemberAction,
  getChannelMembers as getChannelMembersAction,
  fetchMyChannelsAndMembers as fetchChannelsAndMembersAction,
} from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import Chat from '../components/Chat'

const ChatContainer = props => {
  const {
    posts,
    profiles,
    createPost,
    loadMe,
    getProfiles,
    currentUserId,
    channels,
    teams,
    fetchMyChannelsAndMembers,
    currentChannelId,
    getPosts,
    getChannelMembers,
    removeChannelMember,
  } = props
  // Sort and filter posts, posts dependent effect
  const [currentPosts, setCurrentPosts] = useState([])
  const [currentMembers, setCurrentMembers] = useState([])
  const currentChannel = channels[currentChannelId]

  // Get user profiles and current user's teams at initial render
  useEffect(() => {
    getProfiles()
    loadMe()
  }, [])

  // Get team related channels and members
  useEffect(() => {
    const teamId = Object.keys(teams)[0]
    if (teamId) {
      fetchMyChannelsAndMembers(teamId)
    }
  }, [teams])

  // Get posts for current channel
  useEffect(() => {
    if (currentChannelId) {
      getPosts(currentChannelId)
    }
  }, [teams])

  // Filter posts by channel id
  const filterPostsByChannelId = channelId => {
    const filteredPosts = Object.values(posts).filter(
      post => post.channel_id === channelId
    )
    return filteredPosts
  }

  // Get current channel members
  useEffect(() => {
    if (currentChannelId) {
      getChannelMembers(currentChannelId).then(data =>
        setCurrentMembers(data.data)
      )
    }
  }, [channels])

  // Sort posts based on created timestamp
  const sortPosts = allPosts => {
    const postsArr = Object.values(allPosts).map(post => [
      post.create_at,
      post.id,
      post.message,
      post.user_id || '',
    ])
    postsArr.sort((a, b) => a[0] - b[0])
    return postsArr
  }

  // Remove current user from channel
  const handleLeaveChannel = () =>
    removeChannelMember(currentChannelId, currentUserId)

  // Filter and sort posts after fetching
  useEffect(() => {
    if (currentChannelId) {
      const filteredPosts = filterPostsByChannelId(currentChannelId)
      const sorted = sortPosts(filteredPosts)
      setCurrentPosts(sorted)
    }
  }, [posts, teams])

  return (
    <>
      {currentChannel && (
        <Chat
          channel={currentChannel}
          posts={currentPosts}
          profiles={profiles}
          createPost={createPost}
          currentUserId={currentUserId}
          members={currentMembers}
          handleLeaveChannel={handleLeaveChannel}
        />
      )}
    </>
  )
}

ChatContainer.propTypes = {
  posts: PropTypes.instanceOf(Object).isRequired,
  profiles: PropTypes.instanceOf(Object).isRequired,
  channels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  loadMe: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
  currentChannelId: PropTypes.string.isRequired,
  removeChannelMember: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities.teams
  const { channels } = state.entities.channels
  const user = state.entities.users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const currentChannelId = ownProps.match.params.id

  return {
    currentUserId,
    currentChannelId,
    user,
    profiles,
    teams,
    posts,
    channels,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPosts: getPostsAction,
      createPost: createPostAction,
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
      getChannelMembers: getChannelMembersAction,
      getProfiles: getProfilesAction,
      getProfilesInChannel: getProfilesInChannelAction,
      removeChannelMember: removeChannelMemberAction,
      loadMe: loadMeAction,
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
)(memo(ChatContainer, shouldComponentUpdate))
