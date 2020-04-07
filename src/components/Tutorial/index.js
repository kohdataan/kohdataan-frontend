import React from 'react'
import propTypes from 'prop-types'
import Joyride from 'react-joyride'

const Tutorial = props => {
  const { history, steps, updateTutorialWatched, navigateBack } = props

  const locale = {
    back: navigateBack ? 'Seuraava' : 'Edellinen',
    close: 'Sulje',
    last: history.location.pathname === '/' ? 'Valmis' : 'Seuraava',
    next: navigateBack ? 'Edellinen' : 'Seuraava',
    skip: 'Ohita',
  }

  const customStyles = {
    buttonNext: {
      backgroundColor: '#f59023',
      color: 'black',
      fontFamily: 'Poppins',
      fontSize: '16px',
      borderRadius: '30px',
      padding: '5px 10px',
      marginRight: '30px',
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    buttonBack: {
      marginLeft: 'auto',
      fontFamily: 'Poppins',
      fontSize: '16px',
      borderRadius: '30px',
      padding: '5px 10px',
      color: 'black',
      position: 'absolute',
      left: 30,
      bottom: 20,
    },
    buttonSkip: {
      marginLeft: 'auto',
      fontFamily: 'Poppins',
      fontSize: '14px',
      borderRadius: '30px',
      padding: '5px 10px',
      color: 'black',
    },
    buttonClose: {
      display: 'none',
    },
    spotlight: {
      backgroundColor: 'transparent',
    },
  }

  const customReversedStyles = {
    buttonNext: {
      backgroundColor: 'transparent',
      color: 'black',
      fontFamily: 'Poppins',
      fontSize: '16px',
      borderRadius: '30px',
      padding: '5px 10px',
      marginRight: '30px',
      outline: 'none',
      position: 'absolute',
      left: 30,
      bottom: 20,
    },
    buttonBack: {
      marginLeft: 'auto',
      fontFamily: 'Poppins',
      fontSize: '16px',
      borderRadius: '30px',
      padding: '5px 10px',
      color: 'black',
      backgroundColor: '#f59023',
      outline: 'none',
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    buttonClose: {
      display: 'none',
    },
    spotlight: {
      backgroundColor: 'transparent',
    },
  }

  const handleJoyrideCallback = data => {
    const { action, lifecycle, step } = data
    if (!navigateBack) {
      if (
        action === 'next' &&
        lifecycle === 'complete' &&
        step.target === '.nav-bot'
      ) {
        history.push('/friends')
      }
    }
    if (
      action === 'next' &&
      lifecycle === 'complete' &&
      step.target === '.nav-link-Kaverit'
    ) {
      history.push('/')
    }
    if (
      action === 'next' &&
      lifecycle === 'complete' &&
      step.target === '.nav-link-Ryhmät'
    ) {
      updateTutorialWatched()
    }
    if (action === 'skip') {
      updateTutorialWatched()
    }
  }

  return (
    <Joyride
      steps={steps}
      callback={handleJoyrideCallback}
      locale={locale}
      continuous
      disableScrolling
      styles={navigateBack ? customReversedStyles : customStyles}
      disableOverlayClose
      disableCloseOnEsc
    />
  )
}

Tutorial.propTypes = {
  history: propTypes.instanceOf(Object),
  steps: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  updateTutorialWatched: propTypes.func.isRequired,
  navigateBack: propTypes.bool,
}

Tutorial.defaultProps = {
  history: null,
  navigateBack: false,
}

export default Tutorial
