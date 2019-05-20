const user = {
  username: 'testikaveri',
  token: 'testitokenitässä',
}

const getUser = () => {
  return Promise.resolve(user)
}

export default { getUser }
