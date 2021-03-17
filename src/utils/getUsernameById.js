const getUserNamebyId = (id, profiles) => {
  const user = Object.values(profiles).find((profile) => profile.id === id)
  return user ? user.username : ''
}

export default getUserNamebyId
