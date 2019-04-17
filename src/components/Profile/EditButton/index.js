import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const EditButton = props => {
  const { route } = props || ''

  return (
    <Link to={route} className="flex-item user-edit-button">
      <i
        aria-hidden="true"
        className="fas fa-user-edit"
        title="Muokkaa profiilia"
      />
      <span className="sr-only">Muokkaa profiilia</span>
    </Link>
  )
}

export default EditButton
