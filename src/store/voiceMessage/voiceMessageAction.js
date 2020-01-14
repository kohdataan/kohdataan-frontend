import Client from '../../client'
import {
  OPEN_RECORDING_MODAL,
  CLOSE_RECORDING_MODAL,
  START_RECORDING,
  STOP_RECORDING,
  CANCEL_RECORDING,
  UPDATE_RECORDING,
} from '../../contants/actionTypes'

console.log('Client ', Client)
const openRecordingModal = () => dispatch => {
  dispatch({
    type: OPEN_RECORDING_MODAL,
  })
}

const closeRecordingModal = () => dispatch => {
  dispatch({
    type: CLOSE_RECORDING_MODAL,
  })
}

export const cancelRecording = () => dispatch => {
  console.log('cancel recording')
  dispatch({
    type: CANCEL_RECORDING,
  })
  Client.cancelRecording()
  closeRecordingModal()(dispatch)
}

export const sendRecording = () => dispatch => {
  console.log('send recording')
  dispatch({
    type: STOP_RECORDING,
  })
  Client.sendRecording().then(() => {
    // console.log('DONE');
  })
  closeRecordingModal()(dispatch)
}

export const recordVoiceMessage = channelId => dispatch => {
  console.log('recordVoiceMessage')
  console.log('channel id ', channelId)
  openRecordingModal()(dispatch)
  Client.startRecording(channelId).then(() => {
    dispatch({
      type: START_RECORDING,
    })
  })
  Client.on('update', duration => {
    console.log(duration)
    dispatch({
      type: UPDATE_RECORDING,
      duration,
    })
  })
}
