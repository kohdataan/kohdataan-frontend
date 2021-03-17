import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPosts as getPostsAction,
  createPost as createPostAction,
  pinPost as pinPostAction,
  getPostsAfter as getPostsAfterAction,
} from 'mattermost-redux/actions/posts'
import {
  uploadFile as uploadFileAction,
  getFilesForPost as getFilesForPostAction,
} from 'mattermost-redux/actions/files'
import {
  getProfiles as getProfilesAction,
  getProfilesInChannel as getProfilesInChannelAction,
  logout as matterMostLogoutAction,
} from 'mattermost-redux/actions/users'
import {
  removeChannelMember as removeChannelMemberAction,
  getChannelMembers as getChannelMembersAction,
  fetchMyChannelsAndMembers as fetchChannelsAndMembersAction,
  viewChannel as viewChannelAction,
} from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import { getUserByUsername, userLogout, sendEmail } from '../api/user/user'
import { removeUserInterestsFromChannelPurpose } from '../api/channels/channels'
import Chat from '../components/Chat'
import logoutHandler from '../utils/userLogout'
import { isTeamAdmin, isSystemAdmin } from '../utils/userIsAdmin'

const ChatContainer = (props) => {
  const {
    posts,
    profiles,
    createPost,
    getProfiles,
    currentUserId,
    channels,
    teams,
    fetchMyChannelsAndMembers,
    currentChannelId,
    getPosts,
    getChannelMembers,
    removeChannelMember,
    viewChannel,
    uploadFile,
    getFilesForPost,
    statuses,
    matterMostLogout,
    location,
    pinPost,
    files,
    user,
    getPostsAfter,
  } = props

  // Sort and filter posts, posts dependent effect
  const [currentPosts, setCurrentPosts] = useState([])
  const [currentMembers, setCurrentMembers] = useState([])
  const currentChannel = channels[currentChannelId]
  const [filteredOrder, setFilteredOrder] = useState([])
  const [lastViewedAt, setLastViewedAt] = useState(0)
  const [activeMemberMmProfiles, setActiveMemberMmProfiles] = useState([])

  const currentUser =
    location && location.state ? location.state.currentUser : null

  // Get current channel members
  useEffect(() => {
    if (currentChannelId) {
      getChannelMembers(currentChannelId).then((data) =>
        setCurrentMembers(data.data)
      )
    }
  }, [channels, currentChannelId, getChannelMembers])

  useEffect(() => {
    const getCurrentMemberData = async () => {
      const currentMember = await currentMembers.find(
        (member) => member.user_id === currentUserId
      )
      if (currentMember) setLastViewedAt(currentMember.last_viewed_at)
    }
    if (currentMembers) getCurrentMemberData()
  }, [currentMembers, setLastViewedAt, currentUserId])

  // fetches posts sent after last viewed time and filters and orders them
  useEffect(() => {
    const getPostsAfterLastViewed = async () => {
      if (currentUser) {
        const lastViewedPost = Object.values(posts).find(
          (p) => p.create_at === currentUser.last_viewed_at
        )
        if (lastViewedPost) {
          const res = await getPostsAfter(currentChannelId, lastViewedPost.id)
          const filtered = Object.values(res.data.posts).filter(
            (p) => p.type === ''
          )
          const filteredIds = Object.values(filtered).map((p) => p.id)
          const newOrder = res.data.order.filter((id) =>
            filteredIds.includes(id)
          )
          setFilteredOrder(newOrder)
        }
      }
    }
    getPostsAfterLastViewed()
  }, [currentChannelId, getPostsAfter, currentUser])

  // Get user profiles and current user's teams at initial render
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  // Get team related channels and members
  useEffect(() => {
    const { currentTeamId } = teams
    if (currentTeamId) {
      fetchMyChannelsAndMembers(currentTeamId)
    }
  }, [teams, fetchMyChannelsAndMembers])

  // Get posts for current channel and view channel
  useEffect(() => {
    if (currentChannelId) {
      // get maximum of 400 posts at a time
      getPosts(currentChannelId, 0, 100)
      viewChannel(currentChannelId)
    }
  }, [teams, posts, getPosts, viewChannel, currentChannelId])

  // Remove current user from channel
  const handleLeaveChannel = async () => {
    try {
      await removeUserInterestsFromChannelPurpose(
        localStorage.getItem('authToken'),
        currentChannelId
      )
      removeChannelMember(currentChannelId, currentUserId)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  // Filter and sort posts after fetching
  useEffect(() => {
    // Filter posts by channel id
    const filterPostsByChannelId = (channelId) => {
      const filtered = Object.values(posts).filter(
        (post) => post.channel_id === channelId
      )
      return filtered
    }
    // Sort posts based on created timestamp
    const sortPosts = (allPosts) => {
      const postsArr = Object.values(allPosts)
      postsArr.sort((a, b) => a.create_at - b.create_at)
      return postsArr
    }
    if (currentChannelId) {
      const filtered = filterPostsByChannelId(currentChannelId)
      const sorted = sortPosts(filtered)
      setCurrentPosts(sorted)
    }
  }, [posts, teams, currentChannelId])

  const handleLogout = () => logoutHandler(userLogout, matterMostLogout)

  useEffect(() => {
    const getActiveMattermostProfiles = () => {
      const activeProfilesArr =
        currentMembers &&
        currentMembers
          .map((member) => profiles[member.user_id])
          .filter(
            (member) =>
              member &&
              member.delete_at === 0 &&
              member.position !== 'deleted' &&
              !isSystemAdmin(member.id, profiles) &&
              !isTeamAdmin(member.id, teams)
          )
      setActiveMemberMmProfiles(activeProfilesArr)
    }
    getActiveMattermostProfiles()
  }, [currentMembers, profiles, setActiveMemberMmProfiles, teams])

  return (
    <>
      {currentChannel && (
        <Chat
          channel={currentChannel}
          posts={currentPosts}
          profiles={profiles}
          teams={teams}
          createPost={createPost}
          getFilesForPost={getFilesForPost}
          uploadFile={uploadFile}
          currentUserId={currentUserId}
          profilesInChannel={activeMemberMmProfiles}
          membersInChannel={currentMembers}
          handleLeaveChannel={handleLeaveChannel}
          statuses={statuses}
          getUserByUsername={getUserByUsername}
          sendEmail={sendEmail}
          handleLogout={handleLogout}
          location={location}
          pinPost={pinPost}
          filesData={files}
          mmUser={user}
          getPostsAfter={getPostsAfter}
          dividerId={filteredOrder && filteredOrder[filteredOrder.length - 1]}
          lastViewedAt={lastViewedAt}
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
  getFilesForPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  getChannelMembers: PropTypes.func.isRequired,
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
  currentChannelId: PropTypes.string.isRequired,
  removeChannelMember: PropTypes.func.isRequired,
  viewChannel: PropTypes.func.isRequired,
  statuses: PropTypes.instanceOf(Object).isRequired,
  matterMostLogout: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  pinPost: PropTypes.func.isRequired,
  files: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  getPostsAfter: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities
  const { channels } = state.entities.channels
  const user = state.entities.users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const currentChannelId = ownProps.match.params.id
  const { statuses } = state.entities.users
  const { files } = state.entities.files

  return {
    currentUserId,
    currentChannelId,
    user,
    profiles,
    teams,
    posts,
    channels,
    statuses,
    files,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPosts: getPostsAction,
      createPost: createPostAction,
      getFilesForPost: getFilesForPostAction,
      uploadFile: uploadFileAction,
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
      getChannelMembers: getChannelMembersAction,
      getProfiles: getProfilesAction,
      getProfilesInChannel: getProfilesInChannelAction,
      removeChannelMember: removeChannelMemberAction,
      viewChannel: viewChannelAction,
      matterMostLogout: matterMostLogoutAction,
      pinPost: pinPostAction,
      getPostsAfter: getPostsAfterAction,
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
