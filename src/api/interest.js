import handleFetchErrors from './errors'

const getInterest = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  try {
    const resp = await fetch(`${uri}/interest`, {
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

export default getInterest
