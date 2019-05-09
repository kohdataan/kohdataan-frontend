const userLogin = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/login`, {
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

export { userLogin, userSignUp }
