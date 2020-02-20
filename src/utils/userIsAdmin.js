export const isSystemAdmin = (userId, profiles) =>
  profiles &&
  profiles[userId] &&
  profiles[userId].roles.includes('system_admin')

export const isTeamAdmin = (userId, teams) => {
  const { currentTeamId } = teams
  const member =
    teams &&
    teams.membersInTeam &&
    teams.membersInTeam[currentTeamId] &&
    teams.membersInTeam[currentTeamId][userId]
  return member && member.scheme_admin
}
