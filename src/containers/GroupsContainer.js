import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMyTeams as getMyTeamsAction } from 'mattermost-redux/actions/teams'
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
} from 'mattermost-redux/actions/posts'
import { fetchMyChannelsAndMembers as fetchChannelsAndMembersAction } from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import Chat from '../components/Chat'
import Groups from '../components/Groups'
import GroupSuggestions from '../components/GroupSuggestions'

const GroupsContainer = props => {
  const {
    posts,
    channels,
    teams,
    createPost,
    getPosts,
    getMyTeams,
    fetchMyChannelsAndMembers,
  } = props
  const [currentChannel, setCurrentChannel] = useState({})
  const [currentPosts, setCurrentPosts] = useState([])
  const [showChat, setShowChat] = useState(false)

  // Sort posts based on created timestamp
  const sortPosts = allPosts => {
    const postsArr = Object.values(allPosts).map(post => [
      post.create_at,
      post.id,
      post.message,
    ])
    postsArr.sort((a, b) => a[0] - b[0])
    return postsArr
  }

  // Filter posts by channel id
  const filterPostsByChannelId = channelId => {
    const filteredPosts = Object.values(posts).filter(
      post => post.channel_id === channelId
    )
    return filteredPosts
  }

  // Set current channel based on channel id
  const selectChannel = id => () => {
    const current = channels[id]
    // console.log('current channel', current.display_name)
    setCurrentChannel(current)
    setShowChat(true)
  }

  // Get user's teams at initial render
  useEffect(() => {
    getMyTeams()
  }, [])

  // Get channels and members based on team id
  useEffect(() => {
    // console.log('teams effect')
    const teamId = Object.keys(teams)[0]
    if (teamId) {
      fetchMyChannelsAndMembers(teamId)
    }
  }, [teams])

  // Channels & current channel dependent effect
  useEffect(() => {
    // console.log('channels effect')
    const channel = currentChannel
    if (channel.id) {
      getPosts(channel.id)
    }
  }, [channels, currentChannel])

  // Sort and filter posts, posts dependent effect
  useEffect(() => {
    // console.log('posts effect')
    const channel = currentChannel
    if (channel.id) {
      const filteredPosts = filterPostsByChannelId(channel.id)
      const sorted = sortPosts(filteredPosts)
      setCurrentPosts(sorted)
    }
  }, [posts])

  return (
    <div>
      {!showChat && <GroupSuggestions />}
      {!showChat && (
        <Groups channels={channels} selectChannel={selectChannel} />
      )}
      {showChat && (
        <Chat
          channel={currentChannel}
          posts={currentPosts}
          createPost={createPost}
        />
      )}
    </div>
  )
}

GroupsContainer.propTypes = {
  posts: PropTypes.instanceOf(Object).isRequired,
  channels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  getPosts: PropTypes.func.isRequired,
  getMyTeams: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities.teams
  const { channels } = state.entities.channels
  const user = state.entities.users.profiles[currentUserId]
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannelMembers = state.entities.channels.myMembers

  return {
    currentUserId,
    user,
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
      getMyTeams: getMyTeamsAction,
      getPosts: getPostsAction,
      createPost: createPostAction,
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
    },
    dispatch
  )

// export default GroupsContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer)
