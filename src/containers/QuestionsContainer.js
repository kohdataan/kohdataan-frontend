import React from 'react'
import Questions from '../components/Questions'

const QuestionsContainer = () => {

  // TODO: Get question data from backend
  const dummyQuestionData = [
    {
      'question': 'Suosikkivuodenaika?',
      'options': ['Talvi', 'Kevät', 'Kesä', 'Syksy']
    },
    {
      'question': 'Vapaa-ajan viettäminen',
      'options': ['Ulkoilu', 'Lukeminen', 'Elokuvat', 'Musiikki']
    }
  ]

  return <Questions data={dummyQuestionData} />
}

export default QuestionsContainer
