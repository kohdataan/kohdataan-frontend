const isAdmin = (userId, profiles) =>
  profiles &&
  profiles[userId] &&
  profiles[userId].roles.includes('system_admin')

export default isAdmin
