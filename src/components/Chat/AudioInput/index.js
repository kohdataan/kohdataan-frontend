import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import RecordRTC from 'recordrtc'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const AudioInput = props => {
  const { handleSubmit, closeModal, isRecording } = props
  const [stream, setStream] = useState('')
  const [recorder, setRecorder] = useState('')

  useEffect(() => {
    if (isRecording) {
      const openStream = async () => {
        setStream(
          await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
        )
      }
      if (stream === '') {
        openStream()
      }
    }
    return () => {
      if (stream !== '') {
        stream.stop()
      }
    }
  }, [isRecording, stream])

  useEffect(() => {
    if (stream !== '') {
      setRecorder(
        new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
        })
      )
    }
  }, [stream])

  useEffect(() => {
    if (recorder !== '') {
      recorder.startRecording()
    }
  }, [recorder])

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
