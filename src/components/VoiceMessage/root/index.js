import {
  cancelRecording,
  sendRecording,
} from '../../../store/voiceMessage/voiceMessageAction'
import {
  isRecordingModalVisible,
  recordingDuration,
} from '../../../store/voiceMessage/selectors'

import Root from './root'

const {connect} = window.ReactRedux
const {bindActionCreators} = window.Redux

const mapStateToProps = state => ({
  visible: isRecordingModalVisible(state),
  duration: recordingDuration(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      cancel: cancelRecording,
      send: sendRecording,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Root)