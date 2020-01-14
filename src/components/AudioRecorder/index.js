import React, { memo } from 'react'
import Recorder from 'recorder-js'
import ModalContainer from '../ModalContainer'
import ButtonContainer from '../ButtonContainer'

const AudioRecorder = props => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
    onAnalysed: data => console.log(data),
  })

  let isRecording = false
  const blob = null

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => recorder.init(stream))
    .catch(err => console.log('Uh oh... unable to get stream...', err))

  const startRecording = () => {
    recorder.start().then(() => {
      isRecording = true
      console.log('is recording')
    })
  }

  const stopRecording = () => {
    recorder.stop().then(({ blob, buffer }) => {
      console.log(blob)
      // buffer is an AudioBuffer
    })
  }

  const download = () => {
    Recorder.download(blob, 'my-audio-file') // downloads a .wav file
  }
  console.log('audio recorder')
  return (
    <div>
      <ModalContainer>
        <ButtonContainer onClick={startRecording}>Start</ButtonContainer>
        <ButtonContainer onClick={stopRecording}>Start</ButtonContainer>
      </ModalContainer>
    </div>
  )
}

export default memo(AudioRecorder)
