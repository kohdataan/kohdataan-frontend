export default async (logoutAction, matterMostLogoutAction) => {
  try {
    localStorage.removeItem('userId')
    localStorage.removeItem('authToken')
    await logoutAction(localStorage.getItem('authToken'))
    await matterMostLogoutAction()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}
