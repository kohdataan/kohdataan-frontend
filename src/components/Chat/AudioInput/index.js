import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import Timer from 'react-compound-timer'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const AudioInput = props => {
  const { handleSubmit, closeModal, isRecording } = props
  const [stream, setStream] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [recordingFinished, setRecorderFinished] = useState(false)
  const timer = React.createRef()

  // If timer has reached 60 seconds, it sets recordingFinished to true and this is activated
  useEffect(() => {
    if (recordingFinished) {
      timer.current.stop()
      recorder.stopRecording()
      stream.stop()
    } else if (recorder) {
      recorder.startRecording()
    }
  }, [recordingFinished, recorder, stream, timer])

  // This useEffect handles opening and closing audio stream
  useEffect(() => {
    if (isRecording) {
      const openStream = async () => {
        setStream(
          await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
        )
      }
      if (!stream) {
        openStream()
      }
    }
    return () => {
      if (stream) {
        stream.stop()
      }
    }
  }, [isRecording, stream])

  // This useEffect handles creating and setting recorder after stream is set
  useEffect(() => {
    if (stream) {
      setRecorder(
        new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          recorderType: StereoAudioRecorder,
        })
      )
    }
  }, [stream])

  // If recording is finished (timer is at 60 secs) recorder is already stopped.
  const endRecording = () => {
    if (recordingFinished) {
      const blob = recorder.getBlob()
      const file = new File([blob], 'audio.wav')
      handleSubmit(file)
      closeModal()
    } else if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob()
        const file = new File([blob], 'audio.wav')
        handleSubmit(file)
        closeModal()
      })
    } else {
      closeModal()
    }
  }

  // If recording is finished (timer is at 60 secs) recorder is already stopped.
  const cancelRecording = () => {
    if (recordingFinished) {
      closeModal()
    } else if (recorder) {
      recorder.stopRecording(() => {
        closeModal()
      })
    } else {
      closeModal()
    }
  }

  return (
    <main className="audio-recording-content">
      {!recorder && (
        <div className="audio-description-text">
          <p>Odottaa mikrofonia...</p>
        </div>
      )}
      {recorder && (
        <div>
          <div className="audio-recording-info">
            <Timer
              ref={timer}
              lastUnit="s"
              checkpoints={[
                { time: 60000, callback: () => setRecorderFinished(true) },
              ]}
            >
              <div className="audio-timer">
                <Timer.Seconds />
              </div>
            </Timer>
            <span
              className={recordingFinished ? 'pulse-done' : 'pulse-recording'}
            />
          </div>
          <p className="audio-description-text">
            {recordingFinished ? 'Äänitys valmis' : 'Äänitys käynnissä...'}
          </p>
          <div className="audio-control-buttons">
            <ButtonContainer
              className="button cancel-button"
              onClick={cancelRecording}
            >
              peruuta
            </ButtonContainer>
            <ButtonContainer
              className="button save-button"
              onClick={endRecording}
            >
              lähetä
            </ButtonContainer>
          </div>
        </div>
      )}
    </main>
  )
}

AudioInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
}

export default memo(AudioInput)
