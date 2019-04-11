import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMyTeams} from 'mattermost-redux/actions/teams'
import {getPosts, createPost} from 'mattermost-redux/actions/posts'
import {fetchMyChannelsAndMembers} from 'mattermost-redux/actions/channels'
import Chat from '../components/Chat'

const GroupsContainer = (props) => {

  const [currentChannel, setCurrentChannel] = useState('')
  const [currentPosts, setCurrentPosts] = useState([])

  // Sort posts based on created timestamp
  const sortPosts = (posts) => {
    const postsArr = Object.values(posts).map((post =>
      [
        post.create_at,
        post.id,
        post.message, 
      ]
    ))
    postsArr.sort((a, b) => a[0] - b[0])
    return postsArr
  }

  // Filter posts by channel id
  const filterPostsByChannelId = (channelId) => {
    const filteredPosts = Object.values(props.posts)
    .filter(post => post.channel_id === channelId)
    return filteredPosts
  }

  // Set current channel based on channel id
  const selectChannel = (id) => () => {
    const current = props.channels[id]
    setCurrentChannel(current)
  }

  // Get user's teams at initial render
  useEffect(() => {
    props.getMyTeams()
  }, [])

  // Get channels and members based on team id
  useEffect(() => {
    console.log('teams effect')
    const teamId = Object.keys(props.teams)[0]
    if (teamId) {
      props.fetchMyChannelsAndMembers(teamId)
    }
  }, [props.teams])

  // Channels & current channel dependent effect
  useEffect(() => {
    console.log('channels effect')
    const channel = currentChannel
    if(channel) {
      props.getPosts(channel['id'])
    }
  }, [props.channels, currentChannel])

  // Sort and filter posts, posts dependent effect
  useEffect(() => {
    console.log('posts effect')
    const channel = currentChannel
    if(channel) {
      const filteredPosts = filterPostsByChannelId(channel['id'])
      const sorted = sortPosts(filteredPosts)
      setCurrentPosts(sorted)
    }
  }, [props.posts])


  return (
    <div>
      <div>Ryhmät</div>
      { Object.values(props.teams).length > 0 && Object.values(props.teams).map((value => 
          <li key={value.id}>{value.name}</li>
        ))
      }
      <div>Kanavat</div>
      { Object.keys(props.channels).length > 0 && Object.values(props.channels).map((channel => 
          <button key={channel.id} onClick={selectChannel(channel.id)}>{channel.display_name}</button>
        ))
      }
      <Chat channel={currentChannel} posts={currentPosts} createPost={props.createPost}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentUserId = state.entities.users.currentUserId
  const teams = state.entities.teams.teams
  const channels = state.entities.channels.channels
  const user = state.entities.users.profiles[currentUserId]
  const posts = state.entities.posts.posts

  return {
      currentUserId: currentUserId,
      user: user,
      teams: teams,
      posts: posts,
      channels: channels,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMyTeams,
  getPosts,
  createPost,
  fetchMyChannelsAndMembers
}, dispatch)

// export default GroupsContainer
export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer)
