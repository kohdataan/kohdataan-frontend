import handleFetchErrors from '../errors'

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
    throw new Error(e)
  }
}

const userLogout = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/auth/logout`, {
      method: 'POST',
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
    // return handleFetchErrors(resp)
    return await resp.json()
  } catch (e) {
    throw new Error(e)
  }
}

const resetPassword = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/auth/forgot`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const respJSON = await resp.json()
    return respJSON
  } catch (e) {
    throw new Error(e)
  }
}

const setNewPassword = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/auth/reset`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const respJSON = await resp.json()
    return respJSON
  } catch (e) {
    throw new Error(e)
  }
}

const updatePassword = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/auth/update-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const respJSON = await resp.json()
    return respJSON
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

const getUserByUsername = async (username, token) => {
  // TODO
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/user/username/${username}`, {
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
  if (data.userInterests.length >= 3) {
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
  return null
}

const getUserInterest = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/userInterest`, {
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

const getInterestsByUsername = async (token, username) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/userInterest/${username}`, {
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

const sendEmail = async data => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/sendMail/problem`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await resp.json()
  } catch (e) {
    throw new Error(e)
  }
}

const deleteUser = async (data, id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/user/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return await resp.json()
  } catch (e) {
    throw new Error(e)
  }
}

export {
  userLogin,
  userLogout,
  userSignUp,
  resetPassword,
  setNewPassword,
  getUser,
  getUserByUsername,
  updateUser,
  getUserInterest,
  addUserInterests,
  getInterestsByUsername,
  sendEmail,
  updatePassword,
  deleteUser,
}
