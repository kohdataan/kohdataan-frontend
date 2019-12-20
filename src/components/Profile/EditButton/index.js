import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EditButton = props => {
  const { isHighlighted } = props
  const classNameList = [
    'user-edit-button',
    isHighlighted ? 'user-edit-button-highlight' : '',
  ]
  return (
    <div className="profile-header-item">
      <ButtonContainer onClick={() => {}} className={classNameList.join(' ')}>
        Muokkaa
      </ButtonContainer>
    </div>
  )
}

EditButton.propTypes = {
  isHighlighted: propTypes.bool.isRequired,
}

export default memo(EditButton)
