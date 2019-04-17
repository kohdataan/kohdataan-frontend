import React from 'react'
import NavBar from '../components/NavBar'

const NavBarContainer = () => {
  const navLinks = [
    { title: 'Profiili', route: '/profiili', icon: 'fas fa-user-circle' },
    { title: 'Kysymykset', route: '/kysymykset', icon: 'fas fa-balance-scale' },
    { title: 'Ryhmät', route: '/ryhmat', icon: 'fas fa-user-friends' },
  ]
  return <NavBar routes={navLinks} />
}

export default NavBarContainer
