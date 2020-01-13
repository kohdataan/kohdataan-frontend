import getLocations from './location'

describe('Location api service tests', () => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Get Locations calls correct url once and returns data', async () => {
    const mockResponse = [
      'Alajärvi',
      'Alavieska',
      'Alavus',
      'Asikkala',
      'Utsjoki',
      'Uurainen',
      'Uusikaarlepyy',
      'Uusikaupunki',
      'Vaasa',
      'Vöyri',
      'Ylitornio',
      'Ylivieska',
    ]
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await getLocations()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/location/`)
  })

  it('Rejected call for get interests throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(getLocations()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/location/`)
  })
})
