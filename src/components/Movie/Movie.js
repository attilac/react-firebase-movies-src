// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Movie.css';

function Movie(props) {
  const {title, poster, year, children, movieId, genreLinks, addToFavoriteButton } = props,
    posterImage = {
      backgroundImage: 'url(' + poster + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    } 
  return <div className="card">
    <Link 
      className="movie-img-link" 
      to={ `/movie/${movieId}`}
    >
      <div className="responsive-poster">
        <div className="responsive-poster-item" style={posterImage}>     
          { /* <img className="card-img-top img-fluid" src={poster} alt=""/> */ }       
        </div>
      </div>    
    </Link>
    <div className="card-block movie-content">
      <h2 className="card-title movie-title"> 
        <Link 
          className="movie-link" 
          to={ `/movie/${movieId}`}
        >
          {title} 
          <small className="year text-muted"> ({year})</small>
        </Link>  
      </h2>
      { addToFavoriteButton }
      {children}
    </div>  
    <div className="card-footer">
      { genreLinks }
    </div>
  </div>;        
}

Movie.propTypes = {
  addToFavoriteButton: PropTypes.object,
  genreLinks: PropTypes.object,
  movieId: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
  year: PropTypes.string,
  children: PropTypes.object,
}

Movie.defaultProps = {
  poster: ''
}

export default Movie;