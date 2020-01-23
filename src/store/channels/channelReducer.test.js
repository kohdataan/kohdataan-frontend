import channelReducer from './channelReducer'
import * as types from '../../contants/actionTypes'

describe('channel reducer', () => {
  it('should return the initial state', () => {
    expect(channelReducer(undefined, {})).toEqual({ loading: false })
  })

  it('should handle START_INVITATION_FETCHING', () => {
    expect(
      channelReducer(undefined, { type: types.START_INVITATION_FETCHING })
    ).toEqual({ loading: true })
  })

  it('should handle INVITATION_FETCHING_READY', () => {
    expect(
      channelReducer(
        { loading: true },
        { type: types.INVITATION_FETCHING_READY }
      )
    ).toEqual({ loading: false })
  })

  it('should handle GET_CHANNEL_INVITATIONS', () => {
    expect(
      channelReducer(
        {},
        {
          type: types.GET_CHANNEL_INVITATIONS,
          channelInvitations: { found: [1, 2] },
        }
      )
    ).toEqual({ found: [1, 2] })
  })

  it('should handle GET_CHANNEL_INVITATION_MEMBERS', () => {
    expect(
      channelReducer(
        {},
        {
          type: types.GET_CHANNEL_INVITATION_MEMBERS,
          members: [1, 2, 3],
          channelId: 1,
        }
      )
    ).toEqual({ members: { 1: [1, 2, 3] } })
  })

  it('should handle GET_CHANNEL_INVITATION_MEMBERS with older members', () => {
    expect(
      channelReducer(
        { members: { 1: [1, 2, 3] } },
        {
          type: types.GET_CHANNEL_INVITATION_MEMBERS,
          members: [1, 2, 3, 4],
          channelId: 1,
        }
      )
    ).toEqual({ members: { 1: [1, 2, 3, 4] } })
  })
})
