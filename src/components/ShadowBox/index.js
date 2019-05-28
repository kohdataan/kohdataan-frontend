import React, { memo } from 'react'
import propTypes from 'prop-types'
import './styles.scss'

const ShadowBox = props => {
  const { children } = props
  return <div className="shadow-box-container">{children}</div>
}

ShadowBox.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(Array),
    propTypes.node,
  ]).isRequired,
}

export default memo(ShadowBox)
