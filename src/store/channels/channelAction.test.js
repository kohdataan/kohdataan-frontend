import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startGroupPageFetching,
  groupPageFetchingReady,
  getChannelInvitationsAction,
  getMembersByChannelIdAction,
} from './channelAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Channel actions', () => {
  it('dispatches requests for starting invitation fetch', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_START_INVITATION_FETCHING' }]
    const store = mockStore({})

    await store.dispatch(startGroupPageFetching())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for ending invitation fetch', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_INVITATION_FETCHING_READY' }]
    const store = mockStore({})

    await store.dispatch(groupPageFetchingReady())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for getChannelInvitation action and for each found channel getMembers action', async () => {
    const invitations = [{ id: 1 }, { id: 2 }, { id: 3 }]

    fetch
      .once(JSON.stringify({ found: [...invitations] }))
      .once(JSON.stringify({ userDetails: ['prii1', 'prää1'] }))
      .once(JSON.stringify({ userDetails: ['prii2', 'prää2'] }))
      .once(JSON.stringify({ userDetails: ['prii3', 'prää3'] }))

    const expectedActions = [
      {
        type: 'KOHDATAAN_GET_CHANNEL_INVITATIONS',
        channelInvitations: { found: [...invitations] },
      },
      {
        channelId: 1,
        members: ['prii1', 'prää1'],
        type: 'KOHDATAAN_GET_CHANNEL_INVITATION_MEMBERS',
      },
      {
        channelId: 2,
        members: ['prii2', 'prää2'],
        type: 'KOHDATAAN_GET_CHANNEL_INVITATION_MEMBERS',
      },
      {
        channelId: 3,
        members: ['prii3', 'prää3'],
        type: 'KOHDATAAN_GET_CHANNEL_INVITATION_MEMBERS',
      },
    ]
    const store = mockStore({})

    await store.dispatch(getChannelInvitationsAction())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for getting channel members', async () => {
    fetch.once(JSON.stringify({ userDetails: ['prii1', 'prää1'] }))
    const expectedActions = [
      {
        channelId: 1,
        members: ['prii1', 'prää1'],
        type: 'KOHDATAAN_GET_CHANNEL_INVITATION_MEMBERS',
      },
    ]
    const store = mockStore({})

    await store.dispatch(getMembersByChannelIdAction(1))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})
