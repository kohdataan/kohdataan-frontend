import { StorageTypes } from '../../contants/storageTypes'

export default function storageRehydrate(incoming, persistor) {
  return (dispatch, getState) => {
    const state = getState()
    persistor.pause()
    Object.keys(incoming).forEach(key => {
      const storage = {}
      try {
        const value = JSON.parse(incoming[key])
        if (value === null) {
          storage[key] = { value, timestamp: new Date() }
        } else if (typeof state.storage.storage[key] === 'undefined') {
          if (typeof value.timestamp === 'undefined') {
            storage[key] = { value, timestamp: new Date() }
          } else {
            storage[key] = {
              value: value.value,
              timestamp: new Date(value.timestamp),
            }
          }
        } else if (typeof value.timestamp === 'undefined') {
          storage[key] = { value, timestamp: new Date() }
        } else if (
          typeof state.storage.storage[key].timestamp === 'undefined'
        ) {
          storage[key] = {
            value: value.value,
            timestamp: new Date(value.timestamp),
          }
        } else if (
          new Date(value.timestamp) > state.storage.storage[key].timestamp
        ) {
          storage[key] = {
            value: value.value,
            timestamp: new Date(value.timestamp),
          }
        } else {
          return
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-line no-process-env
          console.warn('Error rehydrating data for key "storage"', err) // eslint-disable-line no-console
        }
      }
      dispatch({
        type: StorageTypes.STORAGE_REHYDRATE,
        data: storage,
      })
    })
    persistor.resume()
    return { data: true }
  }
}
