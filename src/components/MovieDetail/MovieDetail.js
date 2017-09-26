// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function MovieDetail(props) {
  const { movie, getActorList, getGenreLinkList, genreOnClick } = props
  return (
    <div className="card">
      <div className="row">

        <div className="col-sm-5 text-center-xs">
          <img className="img-fluid" src={ `/img/${movie.poster}` } alt={ movie.title }/>
        </div>

        <div className="col-sm-7">
          <div className="card-block">

            <header className="movie-header mb-3">
              <h1 className="card-title font-weight-300">
                { movie.title } 
                <small className="text-muted font-weight-100"> ({ movie.year })</small>
              </h1>  
              <ul className="list-inline d-inline mr-2">
                <li className="list-inline-item">
                  { movie.contentRating }
                </li>
              </ul>
              { getGenreLinkList(movie.genres, genreOnClick, 'd-inline') }
              <hr/>
            </header>

            <h4>Storyline</h4>
            <p className="card-text font-weight-300 font-size-base">{ movie.storyline}</p>
            {
              movie.actors &&
                <div>
                  <h4>Actors</h4>
                  { getActorList(movie.actors) }
                </div>   
            }
          </div>  
        </div>   
      </div>       
    </div>
  )
}

MovieDetail.propTypes = {
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,
  movie: PropTypes.object  
}

export default MovieDetail;