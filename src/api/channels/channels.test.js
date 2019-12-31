import * as API from './channels'

describe('Channel api service tests', () => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('Get channel calls correct url once and returns data', async () => {
    const mockResponse = {
      success: true,
      message: 'Channels',
      found: [
        {
          id: 'tscqwpc63bbnpjogta36efit8r',
          create_at: 1575062225257,
          update_at: 1575062225257,
          delete_at: 0,
          team_id: 'b8xayjjsffn1jcj4w8uo8kjpdy',
          type: 'O',
          display_name: 'Luonto',
          name: 'luonto1575062225237',
          header: '',
          purpose: '',
          last_post_at: 1577460617830,
          total_msg_count: 32,
          extra_update_at: 0,
          creator_id: 'rphkr19ta7yftehrc5xaop8dph',
          scheme_id: null,
          props: null,
        },
        {
          id: '3ss7189br7rqbx7zcz8q9sosjh',
          create_at: 1576076209462,
          update_at: 1576076209462,
          delete_at: 0,
          team_id: 'b8xayjjsffn1jcj4w8uo8kjpdy',
          type: 'O',
          display_name: 'Matkustus',
          name: 'matkustus1576076209453',
          header: '',
          purpose: '',
          last_post_at: 1576076209507,
          total_msg_count: 0,
          extra_update_at: 0,
          creator_id: 'rphkr19ta7yftehrc5xaop8dph',
          scheme_id: null,
          props: null,
        },
      ],
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.getChannelInvitations()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/channelInvitation`)
  })

  it('Rejected api call throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.getChannelInvitations()).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/channelInvitation`)
  })
})
