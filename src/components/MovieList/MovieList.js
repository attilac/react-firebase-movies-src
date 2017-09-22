// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Movie from '../Movie/Movie.js';
import PropTypes from 'prop-types'
import Spinner from '../Spinner/Spinner'

function MovieList(props) {
  const { movies, colWidth, genreOnClick, genres } = props,
    getGenreNameFromKey = function(key) {     
      return genres
        .map((item, index) => { 
          if(item.key === key ){     
            return item.title
          }  
        }).filter(x => x !== undefined).join('')
    },
    getGenreLinkList = function(mGenres) {
      
      const genreLinks = Object.keys(mGenres)
        .map((genre, index) =>
          <li key={ index } className="list-inline-item movie-genre-item">
            <Link className="genre-link" to={ `/genre/${getGenreNameFromKey(genre)}`} onClick={ genreOnClick }>
              { getGenreNameFromKey(genre) }
            </Link>
          </li>
        )
      return <ul className="list-inline movie-genre-list">
        { genreLinks }
      </ul>
      
    },   

    list = movies
      .map((item, index) =>
        <div key={ index } className={ colWidth }>
          <Movie title={ item.title } poster={ `/img/${item.poster}` } year={ item.year }>
            { getGenreLinkList(item.genres) }
          </Movie>
        </div>  
      );

  return (
    <section className="MovieList">
      <div className="row">  
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >         
          { list }
        </CSSTransitionGroup>          
      </div>      
    </section>
  ) 
}

MovieList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object).isRequired, 
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  colWidth: PropTypes.string,
  genreOnClick: PropTypes.func
}

export default MovieList;