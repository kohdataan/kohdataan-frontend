const handleFetchErrors = resp => {
  if (!resp.ok) {
    throw Error(resp.statusText)
  }
  return resp.json()
}

export default handleFetchErrors
