import { getConfig } from 'mattermost-redux/selectors/entities/general'

export default function getBasePath(state) {
  const config = getConfig(state) || {}

  if (config.SiteURL) {
    return new URL(config.SiteURL).pathname
  }

  return window.basename || window.location.origin
}
