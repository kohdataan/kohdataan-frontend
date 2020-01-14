import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { rootLoading, rootLoadingReady, initUser } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Root actions', () => {
  it('dispatches requests for starting root loading', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_START_ROOT_LOADING' }]
    const store = mockStore({})

    await store.dispatch(rootLoading())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches requests for root loading ready', async () => {
    const expectedActions = [{ type: 'KOHDATAAN_ROOT_LOADING_READY' }]
    const store = mockStore({})

    await store.dispatch(rootLoadingReady())
    return expect(store.getActions()).toEqual(expectedActions)
  })

  it('should not dispatch any actions without token', async () => {
    const expectedActions = []
    const store = mockStore({})

    await store.dispatch(initUser())
    return expect(store.getActions()).toEqual(expectedActions)
  })
})
