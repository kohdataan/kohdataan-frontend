import React from 'react'
import propTypes from 'prop-types'
import ButtonContainer from '../../ButtonContainer'
import './styles.scss'

const EditButton = props => {
  const { toggleEditProfile, isActive } = props
  const classNameList = [
    'user-edit-button',
    isActive ? 'user-edit-button-active' : '',
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
    /*
    <Link to={route} className="profile-header-item user-edit-button">
      <i
        aria-hidden="true"
        className="fas fa-user-edit"
        title="Muokkaa profiilia"
      />
      <span className="sr-only">Muokkaa profiilia</span>
    </Link>
    */
  )
}

EditButton.propTypes = {
  toggleEditProfile: propTypes.func.isRequired,
  isActive: propTypes.bool.isRequired,
}

export default EditButton
