import React from 'react'
import './styles.scss'
import propTypes from 'prop-types'
import OptionButton from './OptionButton'

const Options = props => {
  const { data } = props
  const { question, options } = data

  const handleClick = (o, q) => () => {
    console.log(q, o)
  }

  return (
    <div>
      {question && <h1>{question}</h1>}
      {options &&
        options.map(option => (
          <OptionButton
            key={option}
            text={option}
            clickHandler={handleClick(option, question)}
          />
        ))}
    </div>
  )
}

Options.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
}

export default Options
