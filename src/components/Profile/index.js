import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Profile = props => {
    const { user } = props
    return (
        <div>
        <div>Profiili</div>
        {user &&
            <div>
                <div>email: {user.email}</div>
                <div>käyttäjänimi: {user.username}</div>
            </div>
        }
    </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Profile