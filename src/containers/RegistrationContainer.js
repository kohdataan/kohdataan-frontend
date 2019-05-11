import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadProfileImage } from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import RegistrationTitle from '../components/RegistrationFlow/RegistrationTitle'
import pages from '../contants/registrationPages'
import StepButton from '../components/RegistrationFlow/StepButton'
import Container from '../components/Container'
import InfoPage from '../components/RegistrationFlow/InfoPage'
import Nickname from '../components/RegistrationFlow/Nickname'
import Description from '../components/RegistrationFlow/Description'
import Picture from '../components/RegistrationFlow/Picture'
import Location from '../components/RegistrationFlow/Location'
import Interests from '../components/RegistrationFlow/Interests'
import { updateUser } from '../store/user/userAction'

const RegistrationContainer = props => {
  const {
    match: {
      params: { step },
    },
    mattermostId,
  } = props

  const [nickname, setNickname] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState(null)

  const subpage = () => {
    switch (step) {
      case pages.info.current:
        return <InfoPage />
      case pages['add-nickname'].current:
        return (
          <Nickname
            value={nickname}
            onChange={e => {
              setNickname(e.target.value)
            }}
          />
        )
      case pages['add-location'].current:
        return (
          <Location onChange={value => setLocation(value)} value={location} />
        )
      case pages['add-description'].current:
        return (
          <Description
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        )
      case pages['add-image'].current:
        return <Picture onChange={p => setImg(p)} />
      case pages['add-interests'].current:
        return <Interests />
      default:
        return undefined
    }
  }

  const stepButtonActions = () => {
    switch (step) {
      case pages['add-nickname'].current: {
        return props.updateUser({ nickname })
      }
      case pages['add-location'].current: {
        return props.updateUser({ location: location.value })
      }
      case pages['add-description'].current: {
        return props.updateUser({ description })
      }
      case pages['add-image'].current: {
        return props.uploadProfileImage(mattermostId, img)
      }
      case pages['add-interests'].current: {
        return console.log('add-interests')
      }
      default:
        return undefined
    }
  }

  return (
    <Container className="registration-container">
      {step !== pages['add-interests'].current && <RegistrationTitle />}
      {subpage()}
      <StepButton params={pages[step]} onClick={stepButtonActions} />
    </Container>
  )
}

RegistrationContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func.isRequired,
  mattermostId: PropTypes.string.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      uploadProfileImage,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {
    mattermostId: state.entities.users.currentUserId,
  }
}

// export default App
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationContainer)
)
