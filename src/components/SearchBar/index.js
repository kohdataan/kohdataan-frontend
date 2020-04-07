import React from 'react'
import propTypes from 'prop-types'
import './styles.scss'
import ButtonContainer from '../ButtonContainer'

const SearchBar = React.forwardRef((props, ref) => {
  const { expression, handleClear, placeholder, label } = props
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // TODO
      console.log(e)
    }
  }

  return (
    <form className="search-bar">
      <div className="search-bar-icon">
        <i className="fas fa-search" aria-hidden="true" />
      </div>
      <input
        className="search-bar-input"
        placeholder={placeholder}
        onChange={e => expression(e.target.value)}
        onKeyPress={e => handleKeyPress(e)}
        ref={ref}
        label={label}
      />
      <div className="search-bar-icon-clear">
        <ButtonContainer className="search-clear-button" onClick={handleClear}>
          <span className="sr-only">Tyhjennä</span>
          <i className="fas fa-times" aria-hidden="true" />
        </ButtonContainer>
      </div>
    </form>
  )
})

SearchBar.propTypes = {
  expression: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  handleClear: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
}

SearchBar.defaultProps = {}

export default SearchBar
