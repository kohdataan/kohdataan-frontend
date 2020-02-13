import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import TextArea from '../../TextArea'
import './styles.scss'

const MAX_LENGTH = 200

const Description = props => {
  const { onChange, value, hideStep } = props
  return (
    <ShadowBox>
      <main role="main" className="add-user-description-container">
        <div className="profile-creation-title-container">
          <h2 className="profile-creation-title">Kerro itsestäsi.</h2>
          {!hideStep && <span className="profile-creation-step-text">4/6</span>}
        </div>

        <TextArea
          inputClassName="add-user-description-text"
          labelClassName="add-user-description-field"
          label="Kuvaus"
          showLabel={false}
          onChange={onChange}
          value={value}
          maxLength={MAX_LENGTH}
        />

        <div className="add-user-description-details-container">
          <div>
            Tämä kuvaus näkyy muille.
            <br />
            Voit lisätä kuvauksen myöhemmin.
          </div>
          <div className="add-user-description-limit">
            {`${value.length}/${MAX_LENGTH}`}
          </div>
        </div>
      </main>
    </ShadowBox>
  )
}

Description.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  hideStep: PropTypes.bool,
}

Description.defaultProps = {
  value: '',
  hideStep: false,
}

export default memo(Description)
