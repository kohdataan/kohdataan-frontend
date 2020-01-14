import { Client4 } from 'mattermost-redux/client'
import Recorder from 'recorder-js'
import { id as pluginId } from '../manifest'

const superagent = require('superagent')

const uri = process.env.REACT_APP_NODE_BACKEND_URL

export default class Client {
  constructor() {
    this._onUpdate = null
    this.timerID = null

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()

    this.recorder = new Recorder(audioContext, {
      // An array of 255 Numbers
      // You can use this to visualize the audio stream
      // If you use react, check out react-wave-stream
      // onAnalysed: data => console.log(data),
    })
    console.log('this.recorder ', this.recorder)
    const isRecording = false
    const blob = null

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        console.log('init stream ', stream)
        this.recorder.init(stream)
      })
      .catch(err => console.log('Uh oh... unable to get stream...', err))

    this.channelId = null
    /* this.recorder.on('maxduration', () => {
      if (this.timerID) {
        clearInterval(this.timerID)
      }
      this.recorder.stop().then(recording => {
        this._recording = recording
        if (this._onUpdate) {
          this._onUpdate(0)
        }
      })
    }) */
  }

  startRecording(channelId) {
    console.log('start recording channel id ', channelId)
    if (!channelId) {
      return Promise.reject(new Error('channel id is required'))
    }
    console.log('client: start recording')
    this._recording = null
    this.channelId = channelId
    console.log('this channel id ', this.channelId)
    console.log('recorder ', this.recorder)
    return this.startRecording(channelId).then(() => {
      this.timerID = setInterval(() => {
        console.log(this.timerID)
        if (this._onUpdate && this.recorder.startTime) {
          this._onUpdate(new Date().getTime() - this.recorder.startTime)
        }
      }, 200)
      this.stopRecording()
    })
  }

  stopRecording() {
    console.log('client: stop recording')
    if (this.timerID) {
      clearInterval(this.timerID)
    }
    this._onUpdate = null
    return this.recorder.stop()
  }

  cancelRecording() {
    console.log('client: cancel recording')
    if (this.timerID) {
      clearInterval(this.timerID)
    }
    this._onUpdate = null
    return this.recorder.cancel()
  }

  _sendRecording({ blob, duration }) {
    const filename = `${new Date().getTime() - duration}.mp3`
    return superagent
      .post(Client4.getFilesRoute())
      .set(Client4.getOptions({ method: 'post' }).headers)
      .attach('files', blob, filename)
      .field('channel_id', this.channelId)
      .accept('application/json')
      .then(res => {
        const fileId = res.body.file_infos[0].id
        return superagent.request
          .post(Client4.getPostsRoute())
          .set(Client4.getOptions({ method: 'post' }).headers)
          .send({
            channel_id: this.channelId,
            message: '',
            type: 'custom_voice',
            props: {
              fileId,
              duration,
            },
          })
          .accept('application/json')
      })
  }

  sendRecording() {
    if (!this.channelId) {
      return Promise.reject(new Error('channel id is required'))
    }
    console.log('client: send recording')
    if (this._recording) {
      return this._sendRecording(this._recording)
    }
    return this.recorder.stop().then(res => {
      return this._sendRecording(res)
    })
  }

  on(type, cb) {
    if (type === 'update') {
      this._onUpdate = cb
    }
  }
}
