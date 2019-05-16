import handleFetchErrors from './errors'

const userLogin = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

const userSignUp = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/user`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleFetchErrors(resp)
  } catch (e) {
    throw new Error(e)
  }
}

const getUser = async (id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/user/${id}`, {
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

const updateUser = async (data, id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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

const addUserInterests = async (data, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/userInterest`, {
      method: 'POST',
      body: JSON.stringify(data),
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

const getUserInterest = async (id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/userInterest/${id}`, {
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

export {
  userLogin,
  userSignUp,
  getUser,
  updateUser,
  getUserInterest,
  addUserInterests,
}
