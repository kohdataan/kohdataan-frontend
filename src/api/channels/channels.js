import handleFetchErrors from '../errors'

const getChannelInvitations = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/channelInvitation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

const getChannelInvitationMembers = async (token, id) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/channel/members/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

// Channel purpose is used for suggesting which channel fits what user
const addUserInterestsToChannelPurpose = async (token, channelId) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/channelPurpose/addUser/${channelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

const removeUserInterestsFromChannelPurpose = async (token, channelId) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/channelPurpose/removeUser/${channelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

const handleUserChangingInterestToChannelsPurposes = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/channelPurpose/resetUserChannels`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

export {
  getChannelInvitations,
  getChannelInvitationMembers,
  addUserInterestsToChannelPurpose,
  removeUserInterestsFromChannelPurpose,
  handleUserChangingInterestToChannelsPurposes,
}
