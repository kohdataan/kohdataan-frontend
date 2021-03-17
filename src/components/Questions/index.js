import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import QuestionsHeader from './QuestionsHeader'
import Options from './Options'
import PrevNextNav from './PrevNextNav'
import './styles.scss'

const Questions = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const { data } = props

  return (
    <div className="questions-wrapper">
      <QuestionsHeader />
      <Options data={data[currentQuestion]} />
      <PrevNextNav
        current={currentQuestion}
        setCurrent={setCurrentQuestion}
        data={data}
      />
    </div>
  )
}

Questions.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
}

export default memo(Questions)
