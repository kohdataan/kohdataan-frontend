import React, { useState, memo } from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import Interests from '../../RegistrationFlow/Interests'
import EditTitle from '../EditTitle'
import ButtonContainer from '../../ButtonContainer'

const EditInterests = props => {
  const { currentInterestIds, handleInterestEditReady, interestOptions } = props
  const [newInterests, setNewInterests] = useState([])

  return (
    <div className="interests-container">
      <EditTitle text="Muokkaa profiiliasi" />
      <Interests
        options={interestOptions}
        interests={currentInterestIds}
        setInterests={setNewInterests}
      />
      <div style={{ marginBottom: '100px', textAlign: 'center' }}>
        <ButtonContainer
          secondary
          onClick={() => handleInterestEditReady(newInterests)}
        >
          Tallenna
        </ButtonContainer>
      </div>
    </div>
  )
}

EditInterests.propTypes = {
  handleInterestEditReady: propTypes.func.isRequired,
  interestOptions: propTypes.instanceOf(Array).isRequired,
  currentInterestIds: propTypes.instanceOf(Array).isRequired,
}

export default memo(EditInterests)
