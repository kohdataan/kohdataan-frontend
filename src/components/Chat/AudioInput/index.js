import React, { memo } from 'react'
import PropTypes from 'prop-types'
import RecordRTCPromisesHandler from 'recordrtc'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const AudioInput = props => {
  const { handleSubmit, closeModal, isOpen } = props

  let recorder

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
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
      const blob = recorder.getBlob()
      const test = new File([blob], 'audio.wav')
      handleSubmit(test)
    })
  }

  if (isOpen) {
    startRecording()
  }

  return (
    <main className="audio-recording-content">
      <p>test</p>
      <ButtonContainer className="test-save-button" onClick={endRecording}>
        save
      </ButtonContainer>
    </main>
  )
}

AudioInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default memo(AudioInput)
