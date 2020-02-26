import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import RecordRTCPromisesHandler from 'recordrtc'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const AudioInput = props => {
  const { handleSubmit, closeModal, isRecording } = props

  let stream
  let recorder

  const startRecording = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
    })
    recorder.startRecording()
  }

  const endRecording = async () => {
    await recorder.stopRecording(() => {
      if (stream) {
        stream.stop()
      }
      const blob = recorder.getBlob()
      const file = new File([blob], 'audio.wav')
      handleSubmit(file)
      closeModal()
    })
  }

  const cancelRecording = async () => {
    await recorder.stopRecording(() => {
      if (stream) {
        stream.stop()
      }
      closeModal()
    })
  }

  useEffect(() => {
    if (isRecording) {
      startRecording()
    }
  }, [isRecording])

  return (
    <main className="audio-recording-content">
      <p>test</p>
      <ButtonContainer className="test-cancel-button" onClick={cancelRecording}>
        cancel
      </ButtonContainer>
      <ButtonContainer className="test-save-button" onClick={endRecording}>
        save
      </ButtonContainer>
    </main>
  )
}

AudioInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
}

export default memo(AudioInput)
