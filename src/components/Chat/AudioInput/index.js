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
  const timer = React.createRef()

  const openStream = async () => {
    const openedStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    if (openedStream) {
      setStream(openedStream)
    }
  }

  useEffect(() => {
    if (showAudioModal) {
      openStream()
    }
  }, [showAudioModal])

  useEffect(() => {
    const startRecording = async () => {
      if (!isIE) {
        const newRecorder = new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          recorderType: StereoAudioRecorder,
          sampleRate: 44100,
        })
        setRecorder(newRecorder)
        if (stream && newRecorder) {
          newRecorder.startRecording()
        }
      }
    }
    if (stream) startRecording()
  }, [stream])

  const stopRecording = async () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob()
        const file = new File([blob], 'audio.wav')
        handleSubmit(file)
        stream.stop()
      })
    } else {
      closeModal()
    }
  }

  const cancelRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        stream.stop()
      })
    }
    closeModal()
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
      {recorder && (
        <div>
          <div className="audio-recording-info">
            <Timer
              ref={timer}
              lastUnit="s"
              checkpoints={[{ time: 60000, callback: () => stopRecording() }]}
            >
              <div className="audio-timer">
                <Timer.Seconds />
              </div>
            </Timer>
            <span className={!showAudioModal ? 'pulse-done' : 'pulse-recording'} />
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
              onClick={stopRecording}
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
  showAudioModal: PropTypes.bool.isRequired,
}

export default memo(AudioInput)
