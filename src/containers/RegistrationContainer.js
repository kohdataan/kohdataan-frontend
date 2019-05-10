import React from 'react'
import { withRouter } from 'react-router-dom'
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

const RegistrationContainer = props => {
  const {
    match: {
      params: { step },
    },
  } = props

  const subpage = () => {
    switch (step) {
      case pages.info.current:
        return <InfoPage />
      case pages['add-nickname'].current:
        return <Nickname />
      case pages['add-location'].current:
        return <Location />
      case pages['add-description'].current:
        return <Description />
      case pages['add-image'].current:
        return <Picture />
      default:
        return null
    }
  }

  return (
    <Container className="registration-container">
      <RegistrationTitle />
      {subpage()}
      <StepButton params={pages[step]} />
    </Container>
  )
}

RegistrationContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
}

export default withRouter(RegistrationContainer)
