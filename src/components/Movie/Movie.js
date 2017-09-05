// eslint-disable-next-line
import React, { Component } from 'react';
import './Movie.css';

function Movie(props) {
  const { title, poster, children} = props
  return <div className="card">
    <div className="responsive-poster">
      <div className="responsive-poster-item">
        <img className="card-img-top img-fluid" src={ poster } alt=""/>
      </div>
    </div>    
    <div className="card-block movie-content">
      <h2 className="card-title movie-title"> { title } </h2>
      { children }
    </div>  
  </div>;        
}

export default Movie;