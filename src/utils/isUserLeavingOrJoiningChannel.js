// Checks if message type is users leaving or joining the channel
const isUserLeavingOrJoiningChannel = post => {
  if (
    post.type === 'system_join_channel' ||
    post.type === 'system_leave_channel' ||
    post.type === 'system_join_team' ||
    post.type === 'system_leave_team'
  ) {
    return true
  }
  return false
}

export default isUserLeavingOrJoiningChannel
