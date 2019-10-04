import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ShadowBox from '../../ShadowBox'
import Checkbox from '../../Checkbox'
import './styles.scss'

const AgePermission = props => {
  const { onChange, checked } = props
  return (
    <ShadowBox>
      <div className="add-user-age-permission-container">
        <span className="add-user-age-permission-title">IKÄSI: </span>
        18 vuotta
        <Checkbox
          label="Näytä ikä muille"
          onChange={onChange}
          checked={checked}
        />
      </div>
    </ShadowBox>
  )
}

AgePermission.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default memo(AgePermission)
