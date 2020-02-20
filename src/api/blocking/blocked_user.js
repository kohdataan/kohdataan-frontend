import handleFetchErrors from '../errors'

const addUserToBlocked = async (data, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/blockUser`, {
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

const removeUserFromBlocked = async (data, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/blockUser`, {
      method: 'DELETE',
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

export { addUserToBlocked, removeUserFromBlocked }
