import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import RecordRTC from 'recordrtc'
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
    recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
    })
    recorder.startRecording()
  }

  const endRecording = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob()
      const file = new File([blob], 'audio.wav')
      handleSubmit(file)
      closeModal()
    })
  }

  const cancelRecording = () => {
    recorder.stopRecording(() => {
      closeModal()
    })
  }

  useEffect(() => {
    if (isRecording) {
      startRecording()
    }
    return () => {
      if (stream) {
        stream.stop()
      }
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
