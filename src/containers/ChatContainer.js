import React, { useEffect, useState } from 'react'
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
import { fetchMyChannelsAndMembers as fetchChannelsAndMembersAction } from 'mattermost-redux/actions/channels'
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
  } = props
  // Sort and filter posts, posts dependent effect
  const [currentPosts, setCurrentPosts] = useState([])

  const currentChannel = channels[currentChannelId]
  // Get user profiles and current user's teams at initial render
  useEffect(() => {
    getProfiles()
    loadMe()
  }, [])

  useEffect(() => {
    const teamId = Object.keys(teams)[0]
    if (teamId) {
      fetchMyChannelsAndMembers(teamId)
    }
  }, [teams])

  useEffect(() => {
    // console.log('channels effect')
    const channel = currentChannel
    if (channel && channel.id) {
      getPosts(channel.id)
    }
  }, [teams])

  // Filter posts by channel id
  const filterPostsByChannelId = channelId => {
    const filteredPosts = Object.values(posts).filter(
      post => post.channel_id === channelId
    )
    return filteredPosts
  }

  // Sort posts based on created timestamp
  const sortPosts = allPosts => {
    const postsArr = Object.values(allPosts).map(post => [
      post.create_at,
      post.id,
      post.message,
      post.user_id,
    ])
    postsArr.sort((a, b) => a[0] - b[0])
    return postsArr
  }

  useEffect(() => {
    const channel = currentChannel
    if (channel && channel.id) {
      const filteredPosts = filterPostsByChannelId(channel.id)
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
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
  currentChannelId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities.teams
  const { channels } = state.entities.channels
  const user = state.entities.users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannelMembers = state.entities.channels.myMembers
  const currentChannelId = ownProps.match.params.id

  return {
    currentUserId,
    currentChannelId,
    user,
    profiles,
    teams,
    posts,
    channels,
    members,
    myMembers: myChannelMembers,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPosts: getPostsAction,
      createPost: createPostAction,
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
      getProfiles: getProfilesAction,
      getProfilesInChannel: getProfilesInChannelAction,
      loadMe: loadMeAction,
    },
    dispatch
  )

// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
