import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  userLogin,
  updateUser,
  getUserInterests,
  addUserInterests,
} from './userAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('User actions', () => {
  it('should not dispatch login actions if there is not response data for user', async () => {
    const mockUser = { user: { email: 'test@test.fi', password: '123' } }
    fetch.once(false)
    const expectedActions = []
    const store = mockStore({})

    await store.dispatch(userLogin(mockUser))
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for updateUser', async () => {
    fetch.once(JSON.stringify({ nickname: 'prii' }))
    const expectedActions = [
      {
        type: 'KOHDATAAN_UPDATE_USER',
        user: { nickname: 'prii' },
      },
    ]
    const store = mockStore({
      entities: {},
    })

    await store.dispatch(updateUser({ nickname: 'prii' }))
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for getUserInterests', async () => {
    fetch.once(JSON.stringify({ result: [1, 2, 3] }))
    const expectedActions = [
      {
        type: 'KOHDATAAN_GET_USER_INTERESTS',
        userInterests: 1,
      },
    ]
    const store = mockStore({
      entities: {},
    })

    await store.dispatch(getUserInterests())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for addUserInterests', async () => {
    const interests = { userInterests: [1, 2, 3] }
    fetch
      .once(JSON.stringify({ result: [1, 2, 3] }))
      .once(JSON.stringify({ result: [1, 2, 3] }))
    const expectedActions = [
      {
        type: 'KOHDATAAN_GET_USER_INTERESTS',
        userInterests: 1,
      },
    ]
    const store = mockStore({
      entities: {},
    })

    await store.dispatch(addUserInterests(interests))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})

// Mattermost redux actions are a lot harder to mock since those are not standard fetch requests but use mattermost client 4
