import React from 'react'
import propTypes from 'prop-types'
import Joyride from 'react-joyride'

const Tutorial = props => {
  const { history, steps, updateTutorialWatched } = props

  const locale = {
    back: 'Edellinen',
    close: 'Sulje',
    last: 'Valmis',
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
    },
    buttonBack: {
      marginLeft: 'auto',
      marginRight: 5,

      fontFamily: 'Poppins',
      fontSize: '16px',
      borderRadius: '30px',
      padding: '5px 10px',
      color: 'black',
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
  }

  return (
    <Joyride
      steps={steps}
      callback={handleJoyrideCallback}
      locale={locale}
      continuous
      disableScrolling
      styles={customStyles}
    />
  )
}

Tutorial.propTypes = {
  history: propTypes.instanceOf(Object),
  steps: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  updateTutorialWatched: propTypes.func,
}

Tutorial.defaultProps = {
  history: null,
  updateTutorialWatched: null,
}

export default Tutorial
