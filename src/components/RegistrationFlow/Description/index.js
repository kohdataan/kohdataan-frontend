import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import Textarea from '../../TextField'
import './styles.scss'

const MAX_LENGTH = 200

const Description = props => {
  const { onChange, value } = props
  return (
    <ShadowBox>
      <div className="add-user-description-container">
        <h3 className="add-user-description-title">Kerro itsestäsi</h3>
        <p className="add-user-description-limit">
          {`${value.length} / ${MAX_LENGTH}`}
        </p>
        <Textarea
          inputClassName="add-user-description-text"
          labelClassName="add-user-description-field"
          label="Kuvaus"
          onChange={onChange}
          value={value}
          maxLength={MAX_LENGTH}
        />
        <p className="add-user-description-title">Tämä kuvaus näkyy muille</p>
      </div>
    </ShadowBox>
  )
}

Description.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

Description.defaultProps = {
  value: '',
}

export default memo(Description)
