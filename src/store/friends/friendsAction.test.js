import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startFriendsPageFetching,
  friendsPageFetchingReady,
  fetchDirectChannelMembers,
} from './friendsAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Friends actions', () => {
  it('dispatches requests for starting friends page fetch', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_START_FRIENDS_FETCHING' }]
    const store = mockStore({})

    await store.dispatch(startFriendsPageFetching())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for ending friends page fetch', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_FRIENDS_FETCHING_READY' }]
    const store = mockStore({})

    await store.dispatch(friendsPageFetchingReady())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('should not dispatch any actions if there are no channels', async () => {
    const expectedActions = []
    const store = mockStore({
      entities: {
        channels: { channels: {} },
        users: { currentUserId: 1 },
      },
    })

    await store.dispatch(fetchDirectChannelMembers())
    return expect(store.getActions()).toEqual(expectedActions)
  })
})

// Mattermost redux actions are a lot harder to mock since those are not standard fetch requests but use mattermost client 4
