import React, { useState, memo } from 'react'
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
import ShowAge from '../components/RegistrationFlow/ShowAge'
import Description from '../components/RegistrationFlow/Description'
import Picture from '../components/RegistrationFlow/Picture'
import Location from '../components/RegistrationFlow/Location'
import Interests from '../components/RegistrationFlow/Interests'
import dataUriToBlob from '../utils/dataUriToBlob'
import { updateUser, addUserInterests } from '../store/user/userAction'
import getInterestsAction from '../store/interest/interestAction'
import ErrorNotification from '../components/RegistrationFlow/ErrorNotification'

const RegistrationContainer = props => {
  const {
    match: {
      params: { step },
    },
    mattermostId,
    interestOptions,
    registrationError,
  } = props
  const [nickname, setNickname] = useState('')
  const [showAge, setShowAge] = useState(false)
  const [location, setLocation] = useState('')
  const [showLocation, setShowLocation] = useState(false)
  const [description, setDescription] = useState('')
  const [img, setImg] = useState(null)
  const [interests, setInterests] = useState([])
  const [valid, setValid] = useState(false)
  const [choiceMade, setChoiceMade] = useState(false)
  const [locationChosen, setLocationChosen] = useState(false)

  const handleNicknameChange = e => {
    setNickname(e.target.value)
    if (e.target.value.length < 1) {
      pages['add-nickname'].valid = false
    } else {
      pages['add-nickname'].valid = true
    }
  }

  const checkInterestsPageValid = () => {
    if (valid) {
      pages['add-interests'].valid = true
    } else {
      pages['add-interests'].valid = false
    }
  }

  const checkAgePageValid = () => {
    if (choiceMade) {
      pages['add-show-age'].valid = true
    } else {
      pages['add-show-age'].valid = false
    }
  }

  const checkLocationPageValid = () => {
    if (locationChosen && location) {
      pages['add-location'].valid = true
    } else {
      pages['add-location'].valid = false
    }
  }
  const subpage = () => {
    switch (step) {
      case pages.info.current:
        return <InfoPage />
      case pages['add-nickname'].current:
        return <Nickname value={nickname} onChange={handleNicknameChange} />
      case pages['add-location'].current:
        return (
          <Location
            onChange={value => setLocation(value)}
            value={location}
            setShowLocation={setShowLocation}
            setLocationChosen={setLocationChosen}
          />
        )
      case pages['add-show-age'].current:
        return <ShowAge setShowAge={setShowAge} setChoiceMade={setChoiceMade} />
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
        return (
          <Interests
            options={interestOptions}
            interests={interests}
            setInterests={setInterests}
            setInterestsValid={setValid}
          />
        )
      default:
        return undefined
    }
  }
  checkInterestsPageValid()
  checkAgePageValid()
  checkLocationPageValid()

  const stepButtonActions = () => {
    switch (step) {
      case pages['add-nickname'].current: {
        return props.updateUser({ nickname, mmId: mattermostId })
      }
      case pages['add-show-age'].current: {
        return props.updateUser({ showAge: showAge.value })
      }
      case pages['add-location'].current: {
        return props.updateUser({
          location: location.value,
          showLocation: showLocation.value,
        })
      }
      case pages['add-description'].current: {
        return props.updateUser({ description })
      }
      case pages['add-image'].current: {
        return props.uploadProfileImage(mattermostId, dataUriToBlob(img))
      }
      case pages['add-interests'].current: {
        return props.addUserInterests({ userInterests: interests })
      }
      default:
        return undefined
    }
  }

  return (
    <Container className="registration-container">
      <RegistrationTitle />
      {subpage()}
      {!registrationError && (
        <StepButton params={pages[step]} onClick={stepButtonActions} />
      )}
      {registrationError && (
        <ErrorNotification errorMessage={registrationError} />
      )}
    </Container>
  )
}

RegistrationContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func.isRequired,
  mattermostId: PropTypes.string.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  interestOptions: PropTypes.instanceOf(Array),
  registrationError: PropTypes.string,
  addUserInterests: PropTypes.func.isRequired,
}

RegistrationContainer.defaultProps = {
  registrationError: null,
  interestOptions: [],
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      uploadProfileImage,
      addUserInterests,
      getInterestsAction,
    },
    dispatch
  )

const mapStateToProps = state => {
  return {
    mattermostId: state.entities.users.currentUserId,
    interestOptions: state.interests.results,
    registrationError: state.user.errorMessage,
  }
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

// export default App
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(RegistrationContainer, shouldComponentUpdate))
)
