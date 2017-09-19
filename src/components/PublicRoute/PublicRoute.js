import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import matchPropTypes from '../matchPropTypes'

/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const PublicRoute = ({ component: Component, user, ...rest, ...parentProps }) => (
  <Route
    {...rest}
    render={routeProps =>
      user
        ? <Redirect to={{ pathname: '/' }} />
        : <Component user={user} {...routeProps} { ...parentProps }/>}
  />
);

PublicRoute.propTypes = matchPropTypes;

export default PublicRoute;