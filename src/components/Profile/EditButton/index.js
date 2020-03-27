import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EditButton = props => {
  const { isHighlighted, label } = props
  const classNameList = [
    'user-edit-button',
    isHighlighted ? 'user-edit-button-highlight' : '',
  ]
  return (
    <div className="profile-header-item">
      <ButtonContainer
        onClick={() => {}}
        className={classNameList.join(' ')}
        label={label}
      >
        Muokkaa
      </ButtonContainer>
    </div>
  )
}

EditButton.propTypes = {
  isHighlighted: propTypes.bool,
  label: propTypes.string,
}

EditButton.defaultProps = {
  isHighlighted: false,
  label: '',
}

export default memo(EditButton)
