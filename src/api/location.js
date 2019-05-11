const getLocations = async token => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/location/`, {
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

export default getLocations
