import React, { useState, memo } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUser,
  uploadProfileImage,
  setDefaultProfileImage as setDefaultProfileImageAction,
} from 'mattermost-redux/actions/users'
import PropTypes from 'prop-types'
import { updateUser, addUserInterests } from '../store/user/userAction'
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
import getInterestsAction from '../store/interest/interestAction'
import ModalContainer from '../components/ModalContainer'
import ButtonContainer from '../components/ButtonContainer'
import ErrorNotification from '../components/RegistrationFlow/ErrorNotification'
import getAge from '../utils/getAge'

const RegistrationContainer = props => {
  const {
    match: {
      params: { step },
    },
    mattermostId,
    interestOptions,
    registrationError,
    userBirthdate,
    mmuser,
    setDefaultProfileImage,
  } = props
  const [nickname, setNickname] = useState('')
  const [showAge, setShowAge] = useState('')
  const [location, setLocation] = useState('')
  const [showLocation, setShowLocation] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState(null)
  const [interests, setInterests] = useState([])
  const [nextButtonActive, setNextButtonActive] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  // Change nextButtonActive value only if new value is different
  const setNextButtonStatus = value => {
    if (value && !nextButtonActive) {
      setNextButtonActive(true)
    } else if (!value && nextButtonActive) {
      setNextButtonActive(false)
    }
  }

  const checkInputValidity = page => {
    switch (page) {
      case 'add-nickname':
        if (nickname.length < 1) {
          setNextButtonStatus(false)
        } else {
          setNextButtonStatus(true)
        }
        break
      case 'add-show-age':
        if (showAge === '') {
          setNextButtonStatus(false)
        } else {
          setNextButtonStatus(true)
        }
        break
      case 'add-location':
        if (location === '' || showLocation === '') {
          setNextButtonStatus(false)
        } else {
          setNextButtonStatus(true)
        }
        break
      case 'add-interests':
        if (interests.length < 3 || interests.length > 5) {
          setNextButtonStatus(false)
        } else {
          setNextButtonStatus(true)
        }
        break
      default:
        setNextButtonStatus(true)
    }
  }

  const subpage = () => {
    switch (step) {
      case pages.info.current:
        checkInputValidity('info')
        return <InfoPage />
      case pages['add-nickname'].current:
        checkInputValidity('add-nickname')
        return (
          <Nickname
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        )
      case pages['add-show-age'].current:
        checkInputValidity('add-show-age')
        return (
          <ShowAge
            onChange={setShowAge}
            age={getAge({ birthdate: userBirthdate })}
            showAge={showAge.toString()}
          />
        )
      case pages['add-location'].current:
        checkInputValidity('add-location')
        return (
          <Location
            onChange={value => setLocation(value)}
            value={location}
            setShowLocation={setShowLocation}
            showLocation={showLocation.toString()}
          />
        )
      case pages['add-description'].current:
        checkInputValidity('add-description')
        return (
          <Description
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        )
      case pages['add-image'].current:
        checkInputValidity('add-image')
        return <Picture onChange={p => setImg(p)} />
      case pages['add-interests'].current:
        checkInputValidity('add-interests')
        return (
          <Interests
            options={interestOptions}
            interests={interests}
            setInterests={setInterests}
          />
        )
      default:
        return undefined
    }
  }

  const getUsername = () => {
    const letter = nickname[0].toLowerCase()
    const { username } = mmuser
    const updated = letter.concat(username.substr(0, 20))
    return updated
  }

  const profileCreationAction = async () => {
    switch (step) {
      case pages['add-nickname'].current: {
        const updatedUsername = getUsername()
        await props.updateUser({
          nickname,
          username: updatedUsername,
          mmid: mattermostId,
        })
        return setDefaultProfileImage(mattermostId)
      }
      case pages['add-show-age'].current: {
        return props.updateUser({ showAge })
      }
      case pages['add-location'].current: {
        return props.updateUser({
          location: location.value,
          showLocation,
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

  const stepButtonActions = () => {
    if (pages[step].last) props.updateUser({ profileReady: true })
    profileCreationAction()
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <Container className="registration-container">
      <RegistrationTitle />
      {subpage()}
      {!registrationError && (
        <StepButton
          params={pages[step]}
          onClick={stepButtonActions}
          nextButtonActive={nextButtonActive}
          setOpenModal={setOpenModal}
        />
      )}
      <ModalContainer
        modalIsOpen={openModal}
        closeModal={closeModal}
        label="User can have five interests at most"
      >
        <div>
          <h3 className="interests-modal-text">
            Valitse vähintään kolme kiinnostavaa asiaa.
          </h3>
          <p>Voit lisätä valinnan klikkaamalla.</p>
          <ButtonContainer
            className="icon-btn interests-icon-btn"
            onClick={closeModal}
          >
            <div className="accept-rules-go-back-button go-back-button" />
          </ButtonContainer>
        </div>
      </ModalContainer>
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
  userBirthdate: PropTypes.string,
  mmuser: PropTypes.shape({ username: PropTypes.string }).isRequired,
  setDefaultProfileImage: PropTypes.func.isRequired,
}

RegistrationContainer.defaultProps = {
  registrationError: null,
  interestOptions: [],
  userBirthdate: '',
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      uploadProfileImage,
      addUserInterests,
      getInterestsAction,
      getUser,
      setDefaultProfileImage: setDefaultProfileImageAction,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { currentUserId } = state.entities.users
  const mmuser =
    state.entities.users.profiles &&
    state.entities.users.profiles[currentUserId]
  return {
    mattermostId: currentUserId,
    mmuser,
    interestOptions: state.interests.results,
    registrationError: state.user.errorMessage,
    userBirthdate: state.user.birthdate,
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
