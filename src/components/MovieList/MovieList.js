// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { movies, colWidth, genreOnClick, genres } = props,
    getGenreNameFromKey = function(key) { 
      //console.log(key)
      return genres
        /*  
        .map((item, index) => { 
          if(item.key === key ){     
            return item.title
          }   
        }).filter(x => x !== undefined).join('') 
        */
       
        .filter((genre) => {
          return genre.key === key
        })
        .map((item, index) => {  
          return item.title
        })
    },
    getGenreLinkList = function(mGenres) {
      //console.log(mGenres)     
      const genreLinks = Object.keys(mGenres)
        .map((key, index) =>
          <li key={ index } className="list-inline-item movie-genre-item">
            <Link className="genre-link" to={ `/genre/${key}`} onClick={ genreOnClick }>
              { getGenreNameFromKey(key)}
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