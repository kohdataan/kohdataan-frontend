import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from './components/Container'
import NavBarContainer from './containers/NavBarContainer'
import GroupsContainer from './containers/GroupsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import ProfileContainer from './containers/ProfileContainer'

const App = () => {
  return (
    <Router>
      <Container className="main-container">
        <Route path="/profiili" component={ProfileContainer} />
        <Route path="/kysymykset" component={QuestionsContainer} />
        <Route path="/ryhmat" component={GroupsContainer} />
        <NavBarContainer />
      </Container>
    </Router>
  )
}

export default App
