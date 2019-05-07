import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  loadMe as loadMeAction,
  getProfiles as getProfilesAction,
  getProfilesInChannel as getProfilesInChannelAction,
} from 'mattermost-redux/actions/users'
import { fetchMyChannelsAndMembers as fetchChannelsAndMembersAction } from 'mattermost-redux/actions/channels'
import PropTypes from 'prop-types'
import Groups from '../components/Groups'
import GroupSuggestions from '../components/GroupSuggestions'

const GroupsContainer = props => {
  const {
    channels,
    teams,
    loadMe,
    getProfiles,
    fetchMyChannelsAndMembers,
    users,
  } = props

  // Get user profiles and current user's teams at initial render
  useEffect(() => {
    getProfiles()
    loadMe()
  }, [])

  // Get channels and members based on team id
  // & When user joins a channel, users props is changed and
  // channels need to be fetched again
  useEffect(() => {
    const teamId = Object.keys(teams)[0]
    if (teamId) {
      fetchMyChannelsAndMembers(teamId)
    }
  }, [teams, users])

  // Get only group channels (filter direct messages out)
  const getGroupChannels = allChannels => {
    const filteredChannels = Object.values(allChannels).filter(
      channel => channel.type !== 'D'
    )
    return filteredChannels
  }

  return (
    <>
      <GroupSuggestions />
      <Groups channels={getGroupChannels(channels)} />
    </>
  )
}

GroupsContainer.propTypes = {
  channels: PropTypes.instanceOf(Object).isRequired,
  teams: PropTypes.instanceOf(Object).isRequired,
  users: PropTypes.instanceOf(Object).isRequired,
  loadMe: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  fetchMyChannelsAndMembers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const { teams } = state.entities.teams
  const { channels } = state.entities.channels
  const { users } = state.entities
  const user = users.profiles[currentUserId]
  const { profiles } = state.entities.users
  const { posts } = state.entities.posts
  const members = state.entities.channels.membersInChannel
  const myChannelMembers = state.entities.channels.myMembers

  return {
    currentUserId,
    users,
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
      fetchMyChannelsAndMembers: fetchChannelsAndMembersAction,
      getProfiles: getProfilesAction,
      getProfilesInChannel: getProfilesInChannelAction,
      loadMe: loadMeAction,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer)
