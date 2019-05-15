const handleFetchErrors = resp => {
  if (!resp.ok) {
    throw Error(resp.statusText)
  }
  return resp
}

export default handleFetchErrors
