import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import matchPropTypes from '../matchPropTypes'

/**
 * If we have a logged-in user, display the component, otherwise redirect to login page.
 */
const PrivateRoute = ({ component: Component, user, ...rest, ...parentProps }) => (
  <Route 
    { ...rest }
    render={ routeProps =>
      user
        ? <Component user={ user } { ...routeProps } { ...parentProps }/>
        : <Redirect to={{ pathname: '/login' }} />
    }
  />
)

PrivateRoute.propTypes = matchPropTypes;

export default PrivateRoute;
