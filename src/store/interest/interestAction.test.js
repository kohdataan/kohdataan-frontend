import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import getInterestsAction from './interestAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Interest actions', () => {
  it('dispatches request for getInterest', async () => {
    fetch.once(JSON.stringify([1, 2, 3]))
    const expectedActions = [
      { type: 'KOHDATAAN_GET_INTERESTS', interests: [1, 2, 3] },
    ]
    const store = mockStore({})

    await store.dispatch(getInterestsAction())
    return expect(store.getActions()).toEqual(expectedActions)
  })
})
