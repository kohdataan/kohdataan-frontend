import React from 'react'
import './styles.scss'

const OptionButton = props => {
    const { text, clickHandler } = props

    return (
        <div>
            <button onClick={clickHandler}>{text}</button>
        </div>
    )
}

export default OptionButton
