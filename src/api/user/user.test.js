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

  it('GetUser calls correct url once and returns data', async () => {
    const mockResponse = { success: true, user: { username: 'prii' } }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.getUser(1, 'mockToken')
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/1`)
  })

  it('Rejected call for getUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.getUser(1, 'token')).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/1`)
  })

  it('GetUserByUsername calls correct url once and returns data', async () => {
    const mockResponse = { success: true, user: { username: 'prii' } }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.getUserByUsername('prii')
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/username/prii`)
  })

  it('Rejected call for getUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.getUserByUsername('prii')).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/username/prii`)
  })

  it('UpdateUser calls correct url once and returns data', async () => {
    const mockResponse = { success: true, user: { username: 'prii' } }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const data = { nickname: 'prii' }

    const resp = await API.updateUser(data, 1)
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/1`)
  })

  it('Rejected call for updateUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))

    await expect(API.updateUser()).rejects.toThrow('Failed for some reason')
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/user/undefined`)
  })

  it('AddUserInterests calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const data = { userInterests: [1, 2, 3] }

    const resp = await API.addUserInterests(data)
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest`)
  })

  it('Rejected call for updateUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))
    const data = { userInterests: [1, 2, 3] }
    await expect(API.addUserInterests(data)).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest`)
  })

  it('GetUserInterests calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.getUserInterest()
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest`)
  })

  it('Rejected call for updateUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))
    await expect(API.getUserInterest()).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest`)
  })

  it('GetUInterestsByUsername calls correct url once and returns data', async () => {
    const mockResponse = { success: true, interests: [1, 2, 3] }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const resp = await API.getInterestsByUsername('token', 'prii')
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest/prii`)
  })

  it('Rejected call for updateUser throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))
    await expect(API.getInterestsByUsername('token', 'prii')).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/userInterest/prii`)
  })

  it('SendEmail calls correct url once and returns data', async () => {
    const mockResponse = { success: true }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const data = { problem: 'I have problem' }
    const resp = await API.sendEmail(data)
    expect(resp).toEqual(mockResponse)
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/sendMail/problem`)
  })

  it('Rejected call for sendEmail throws an error', async () => {
    fetch.mockRejectOnce(new Error('Failed for some reason'))
    await expect(API.sendEmail({ problem: 'I have problem' })).rejects.toThrow(
      'Failed for some reason'
    )
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${uri}/sendMail/problem`)
  })
})
