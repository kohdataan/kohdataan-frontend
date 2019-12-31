import * as API from './user'

describe('User api service tests', () => {
  const uri = process.env.REACT_APP_NODE_BACKEND_URL

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('User Login calls correct url once and returns data', async () => {
    const mockResponse = { success: true, token: 'abcd123' }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const userData = { email: 'test@test.fi', password: 'abcKissakävelee' }

    const resp = await API.userLogin(userData)
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/login`)
  })

  it('Rejected call for userLogin throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.userLogin()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/login`)
  })

  it('UserLogout calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const token = 'mockToken'

    const resp = await API.userLogout(token)
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/logout`)
  })

  it('Rejected call for userLogout throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.userLogout('token')).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/logout`)
  })

  it('UserSignup calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.userSignUp()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user`)
  })

  it('Rejected call for userSignUp throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.userSignUp()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user`)
  })

  it('ResetPassword calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.resetPassword()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/forgot`)
  })

  it('Rejected call for resetPassword throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.resetPassword()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/forgot`)
  })

  it('SetNewPassword calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.setNewPassword()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/reset`)
  })

  it('Rejected call for SetNewPassword throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.setNewPassword()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/auth/reset`)
  })
})
