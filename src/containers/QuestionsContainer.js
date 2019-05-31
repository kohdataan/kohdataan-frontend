import React, { memo } from 'react'
import Questions from '../components/Questions'

const QuestionsContainer = () => {
  // TODO: Get question data from backend
  const dummyQuestionData = [
    {
      question: 'Suosikkivuodenaika?',
      options: ['Talvi', 'Kevät', 'Kesä', 'Syksy'],
    },
    {
      question: 'Vapaa-ajan viettäminen',
      options: ['Ulkoilu', 'Lukeminen', 'Elokuvat', 'Musiikki'],
    },
  ]

  return <Questions data={dummyQuestionData} />
}

const shouldComponentUpdate = (props, prevProps) => {
  const { match: pMatch, ...prest } = prevProps
  const { match, ...rest } = props
  return JSON.stringify(rest) === JSON.stringify(prest)
}

export default memo(QuestionsContainer, shouldComponentUpdate)
