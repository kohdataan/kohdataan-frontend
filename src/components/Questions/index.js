import React, {useState} from 'react'
import Header from './Header'
import Options from './Options'
import PrevNextNav from './PrevNextNav'
import PropTypes from 'prop-types'
import './styles.scss'

const Questions = props => {

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    
    const { data } = props

    return (
        <div className="align-center">
            <Header />
            <Options data={data[currentQuestion]} />
            <PrevNextNav current={currentQuestion} setCurrent={setCurrentQuestion} data={data}/>
        </div>
    )
}

Questions.propTypes = {
    data: PropTypes.array.isRequired
}

export default Questions