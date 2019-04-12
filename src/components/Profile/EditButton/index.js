import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const EditButton = props => {
  const { route, title } = props

  return (
    <Link to={route}>
      <span>Muokkaa</span>
    </Link>
  )
}

export default EditButton