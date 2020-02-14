const updateUsername = (nickname, mmuser) => {
  const letter = nickname[0].toLowerCase()
  const { username } = mmuser
  const updated = letter.concat(username.substr(0, 21))
  return updated
}

export default updateUsername
