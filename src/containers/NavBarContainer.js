import React from 'react'
import NavBar from '../components/NavBar'

const NavBarContainer = () => {
  const navLinks = [
    { title: 'Profiili', route: '/profiili' },
    { title: 'Kysymykset', route: '/kysymykset' },
    { title: 'Ryhmät', route: '/ryhmat' },
  ]
  return <NavBar routes={navLinks} />
}

export default NavBarContainer
