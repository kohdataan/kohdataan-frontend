import React from 'react'
import { connect } from 'react-redux'
import BottomNavigation from '../components/BottomNavigation'
import BottomNavigationLink from '../components/BottomNavigationLink'

const BottomNavigationContainer = () => {
  return (
    <BottomNavigation>
      <BottomNavigationLink
        title="Profiili"
        route="/profiili"
        icon="fas fa-user-circle"
      />
      <BottomNavigationLink
        title="Kysymykset"
        route="/kysymykset"
        icon="fas fa-balance-scale"
      />
      <BottomNavigationLink
        title="Ryhmät"
        route="/ryhmat"
        icon="fas fa-user-friends"
      />
    </BottomNavigation>
  )
}

const mapStateToProps = state => {
  const location = state.router && state.router.location
  return {
    location,
  }
}

export default connect(mapStateToProps)(BottomNavigationContainer)
