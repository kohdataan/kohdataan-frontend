import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import ProfileImage from './ProfileImage'
import Description from './Description'
import Interests from './Interests'
import EditButton from './EditButton'
import Header from './Header'

const Profile = props => {

    const { user } = props
    const descriptionText = "Esimerkkikuvaus käyttäjästä"
    const editProfileRoute = '/muokkaa'

    return (
        <div>
        { user && <Header username={user.username} /> }
            <ProfileImage />
            <Description text={descriptionText}/>
            <Interests />
            <EditButton route={editProfileRoute} />
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object,
}

export default Profile