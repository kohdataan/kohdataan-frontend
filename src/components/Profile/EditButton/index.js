import React, { memo } from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EditButton = props => {
  const { toggleEditProfile, isActive, isHighlighted } = props
  const classNameList = [
    'user-edit-button',
    isActive ? 'user-edit-button-active' : '',
    isHighlighted ? 'user-edit-button-highlight' : '',
  ]
  return (
    <div className="profile-header-item">
      <ButtonContainer
        onClick={toggleEditProfile}
        className={classNameList.join(' ')}
      >
        <i
          aria-hidden="true"
          className="fas fa-user-edit"
          title="Muokkaa profiilia"
        />
        <span className="sr-only">Muokkaa profiilia</span>
      </ButtonContainer>
    </div>
  )
}

EditButton.propTypes = {
  toggleEditProfile: propTypes.func.isRequired,
  isActive: propTypes.bool.isRequired,
  isHighlighted: propTypes.bool.isRequired,
}

export default memo(EditButton)
