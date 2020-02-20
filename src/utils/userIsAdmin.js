const isAdmin = (userId, profiles) =>
  profiles &&
  profiles[userId] &&
  (profiles[userId].roles.includes('system_admin') ||
    profiles[userId].roles.includes('team_admin'))

export default isAdmin
