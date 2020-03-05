import React from 'react'
import propTypes from 'prop-types'
import Joyride from 'react-joyride'

const Tutorial = props => {
  const { history, steps, updateTutorialWatched } = props

  const locale = {
    back: 'Edellinen',
    close: 'Sulje',
    last: history.location.pathname === '/' ? 'Valmis' : 'Seuraava',
    next: 'Seuraava',
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
    },
    buttonBack: {
      marginLeft: 'auto',
      fontFamily: 'Poppins',
      fontSize: '14px',
      borderRadius: '30px',
      padding: '5px 10px',
      color: 'black',
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
  }

  const handleJoyrideCallback = data => {
    const { action, lifecycle, step } = data
    if (
      action === 'next' &&
      lifecycle === 'complete' &&
      step.target === '.nav-bot'
    ) {
      history.push('/friends')
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
      styles={customStyles}
      disableOverlayClose
      disableCloseOnEsc
    />
  )
}

Tutorial.propTypes = {
  history: propTypes.instanceOf(Object),
  steps: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  updateTutorialWatched: propTypes.func.isRequired,
}

Tutorial.defaultProps = {
  history: null,
}

export default Tutorial
