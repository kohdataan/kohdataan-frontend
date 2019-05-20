const dataURItoBlob = dataURI => {
  if (!dataURI) {
    return undefined
  }

  let format = 'image/jpeg'
  const lowerCased = dataURI.toLowerCase()
  if (lowerCased.indexOf('png') !== -1) {
    format = 'image/png'
  } else if (lowerCased.indexOf('jpg') !== -1) {
    format = 'image/jpg'
  } else if (lowerCased.indexOf('jpeg') !== -1) {
    format = 'image/jpeg'
  } else if (lowerCased.indexOf('bmp') !== -1) {
    format = 'image/bmp'
  }

  const binary = atob(dataURI.split(',')[1])
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: format })
}

export default dataURItoBlob
