import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const EditButton = props => {
  const { route } = props || ''

  return (
    <Link to={route} className="flex-item user-edit-button">
      <i className="fas fa-user-edit" />
    </Link>
  )
}

export default EditButton
