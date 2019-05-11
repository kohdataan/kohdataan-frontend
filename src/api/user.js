const userLogin = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
  return resp
}

const userSignUp = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => err)
  return resp
}

const getUser = async (id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => err)
  return resp
}

const updateUser = async (data, id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/user/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => err)
  return resp
}

export { userLogin, userSignUp, getUser, updateUser }
