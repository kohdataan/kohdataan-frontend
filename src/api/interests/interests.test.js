import getInterests from './interest'

describe('Interests api service tests', () => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Get Interests calls correct url once and returns data', async () => {
    const mockResponse = {
      success: true,
      message: 'User interests fetched',
      results: [
        { id: 1, name: 'Eläimet' },
        { id: 2, name: 'Matkustus' },
        { id: 3, name: 'Luonto' },
        { id: 4, name: 'Matkustus' },
        { id: 5, name: 'Urheilu' },
      ],
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await getInterests()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/interest`)
  })

  it('Rejected call for get interests throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(getInterests()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/interest`)
  })
})
