// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { 
      addFavoriteButton,
      colWidth, 
      genreOnClick, 
      getActorList, 
      getGenreLinkList, 
      heading,
      movies
    } = props,
    list = movies
      .map((item, index) =>
        <div key={ `movie-${item.key}` } className={ colWidth }>
          <Movie 
            title={ item.title } 
            poster={ `/img/${item.poster}` } 
            year={ item.year }
            movieId={ item.key }
            genreLinks={ getGenreLinkList(item.genres, genreOnClick, '') }
            addToFavoriteButton={ addFavoriteButton(item) }
          >    
          </Movie>  
          { /* item.actors !== undefined && 
            <div>
              <h6 className="font-size-sm">Stars</h6>
              { getActorList(item.actors) }
            </div>  
            */
          }
        </div>  
      )

  return (
    <section className="MovieList">
      <h1 className="page-title mb-3 font-weight-100 text-uppercase">
        { heading }
      </h1>
      <div className="row">  
        <CSSTransitionGroup
          transitionName="movie-fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={300}          
        >         
          { list }
        </CSSTransitionGroup>          
      </div>      
    </section>
  ) 
}

MovieList.propTypes = {
  addFavoriteButton: PropTypes.func,
  addMovieToFavorites: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired, 
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,
  heading: PropTypes.string, 
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  colWidth: PropTypes.string,
  genreOnClick: PropTypes.func,
  user: PropTypes.object
}

export default MovieList;