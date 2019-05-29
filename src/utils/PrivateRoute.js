import React, { memo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  location: PropTypes.string,
}

PrivateRoute.defaultProps = {
  location: '',
}

export default memo(PrivateRoute)
