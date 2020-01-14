import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Loader = props => {
  const { zeroMargin } = props
  return (
    <div className="loader-container">
      <div
        className={`${
          zeroMargin ? 'no-margin-spinner' : 'margin-spinner'
        } spinner`}
      >
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  )
}

Loader.propTypes = {
  zeroMargin: PropTypes.bool,
}

Loader.defaultProps = {
  zeroMargin: false,
}

export default Loader
