// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { movies, colWidth, genreOnClick, genres, getGenreNameFromKey, getGenreLinkList, getActorList } = props,
    list = movies
      .map((item, index) =>
        <div key={ item.key } className={ colWidth }>
          <Movie 
            title={ item.title } 
            poster={ `/img/${item.poster}` } 
            year={ item.year }
            movieId={ item.key }
            genreLinks={ getGenreLinkList(item.genres, genreOnClick) }
          >    
            { /* item.actors !== undefined && 
              <div>
                <h6 className="font-size-sm">Stars</h6>
                { getActorList(item.actors) }
              </div>  
              */
            }
          </Movie>
        </div>  
      )

  return (
    <section className="MovieList">
      <div className="row">  
        <CSSTransitionGroup
          transitionName="movie-fade"
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
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  colWidth: PropTypes.string,
  genreOnClick: PropTypes.func
}

export default MovieList;