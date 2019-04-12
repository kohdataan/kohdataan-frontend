import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'

const Profile = props => {
    const { user } = props
    const descriptionText = "Innokas purjehtija Helsingistä"
    return (
        <div>
            <h3>Oma Profiili</h3>

            { user &&
                <div>
                    <div>email: {user.email}</div>
                    <div>käyttäjänimi: {user.username}</div>
                </div>
            }
            <br />
            <ProfileImage />
            <Description text={descriptionText}/>
            <Interests />
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Profile