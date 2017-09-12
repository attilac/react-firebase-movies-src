// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Movie.css';

function Movie(props) {
  const {title, poster, year, children} = props
  return <div className="card">
    <div className="responsive-poster">
      <div className="responsive-poster-item">
        <img className="card-img-top img-fluid" src={poster} alt=""/>
      </div>
    </div>    
    <div className="card-block movie-content">
      <h2 className="card-title movie-title"> {title} <small className="year text-muted">({year})</small></h2>
      {children}
    </div>  
  </div>;        
}

Movie.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  year: PropTypes.string,
  children: PropTypes.object,
}

Movie.defaultProps = {
  poster: ''
}

export default Movie;