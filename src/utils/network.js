import { Client4 } from 'mattermost-redux/client'

const MAX_NETWORK_RETRIES = 7
const MIN_NETWORK_RETRY_TIME = 3000
const MAX_NETWORK_RETRY_TIME = 300000

function handle(callback, online) {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => callback(online))
  } else {
    setTimeout(() => callback(online), 0)
  }
}

async function isOnline() {
  if (window.navigator && window.navigator.onLine) {
    return true
  }

  try {
    await Client4.ping()
  } catch (err) {
    return false
  }

  return true
}

let retryTimeoutId
let retryCount

async function checkNetworkStatus(callback) {
  const online = await isOnline()

  if (online) {
    retryCount = 0
    clearTimeout(retryTimeoutId)

    handle(callback, true)
    return
  }

  let retryTime = MIN_NETWORK_RETRY_TIME

  if (retryCount > MAX_NETWORK_RETRIES) {
    retryTime = MIN_NETWORK_RETRY_TIME * retryCount
    if (retryTime > MAX_NETWORK_RETRY_TIME) {
      retryTime = MAX_NETWORK_RETRY_TIME
    }
  }

  retryCount += 1

  retryTimeoutId = setTimeout(() => checkNetworkStatus(callback), retryTime)

  handle(callback, false)
}

export default async function detect(callback) {
  window.addEventListener('online', () => checkNetworkStatus(callback))
  window.addEventListener('offline', () => checkNetworkStatus(callback))
  checkNetworkStatus(callback)
}
