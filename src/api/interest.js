// TODO: URI??
const addInterests = async (data, id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/interest/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
  return resp
}

// TODO: URI??
const getInterests = async (id, token) => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  const resp = await fetch(`${uri}/interest/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
  return resp
}

export { addInterests, getInterests }
