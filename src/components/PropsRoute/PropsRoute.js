import React from 'react'
import { Route } from 'react-router-dom'
import matchPropTypes from '../matchPropTypes'

/**
 * 
 */
const PropsRoute = ({ component: Component, user, ...rest, ...parentProps }) => (
  <Route
    {...rest}
    render={ routeProps =>
      <Component user={user} {...routeProps} { ...parentProps }/>
    }
  />
);

PropsRoute.propTypes = matchPropTypes;

export default PropsRoute;