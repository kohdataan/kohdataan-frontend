import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isIE } from 'react-device-detect'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import Timer from 'react-compound-timer'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const AudioInput = props => {
  const { handleSubmit, closeModal, showAudioModal } = props
  const [stream, setStream] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [permission, setPermission] = useState(true)
  const [recordingFinished, setRecordingFinished] = useState(false)
  const timer = React.createRef()

  // This useEffect handles opening and closing audio stream
  useEffect(() => {
    if (showAudioModal && !isIE) {
      const openStream = async () => {
        try {
          const openedStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
          if (openedStream) {
            setPermission(true)
            setStream(openedStream)
          } else {
            closeModal()
          }
        } catch (e) {
          setPermission(false)
          console.error(e)
        }
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
  }, [showAudioModal, stream])

  // This useEffect handles creating and setting recorder after stream is set
  useEffect(() => {
    if (stream) {
      setRecorder(
        new RecordRTC(stream, {
          type: 'audio',
          disableLogs: true,
          mimeType: 'audio/wav',
          recorderType: StereoAudioRecorder,
        })
      )
    }
  }, [stream])

  useEffect(() => {
    if (recorder) {
      recorder.startRecording()
    }
  }, [recorder])

  useEffect(() => {
    const stopRecording = () => {
      if (recorder) {
        closeModal()
        recorder.stopRecording(() => {
          const blob = recorder.getBlob()
          const file = new File([blob], 'audio.wav')
          handleSubmit(file)
        })
      } else {
        closeModal()
      }
    }
    if (recordingFinished) stopRecording()
  }, [recordingFinished])

  const cancelRecording = () => {
    closeModal()
    if (recorder) {
      recorder.stopRecording()
    }
  }

  return (
    <main className="audio-recording-content">
      {isIE && (
        <div className="IE-info-container">
          <p className="IE-info-text">
            Interner Explorer -selaimella ei valitettavasti voi lähettää
            ääniviestejä.
          </p>
          <ButtonContainer
            onClick={closeModal}
            className="button IE-close-button"
          >
            Sulje
          </ButtonContainer>
        </div>
      )}
      {!recorder && !isIE && (
        <div className="audio-description-text">
          <p>Odottaa mikrofonia...</p>
        </div>
      )}
      {recorder && permission && (
        <div>
          <div className="audio-recording-info">
            <Timer
              ref={timer}
              lastUnit="s"
              checkpoints={[
                { time: 60000, callback: () => setRecordingFinished(true) },
              ]}
            >
              <div className="audio-timer">
                <Timer.Seconds />
              </div>
            </Timer>
            <span
              className={!showAudioModal ? 'pulse-done' : 'pulse-recording'}
            />
          </div>
          <p className="audio-description-text">
            {!showAudioModal ? 'Äänitys valmis' : 'Äänitys käynnissä...'}
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
              onClick={() => setRecordingFinished(true)}
            >
              lähetä
            </ButtonContainer>
          </div>
        </div>
      )}
      {!permission && (
        <div className="audio-message-error-container">
          <p>Jos haluat lähettää ääniviestin, anna lupa mikrofonin käytölle.</p>
          <ButtonContainer
            className="audio-error-button"
            onClick={() => closeModal()}
          >
            Sulje
          </ButtonContainer>
        </div>
      )}
    </main>
  )
}

AudioInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showAudioModal: PropTypes.bool.isRequired,
}

export default memo(AudioInput)
