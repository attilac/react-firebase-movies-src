// eslint-disable-next-line
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class ScrollToTop extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props
    return children
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.object,
}

export default withRouter(ScrollToTop)