// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import Button from '../Button/Button.js'

import Movie from '../Movie/Movie.js';

function MovieList(props) {
  const { movies, colWidth, genreOnClick, genres, getGenreNameFromKey, getGenreLinkList, getActorList, user, addMovieToFavorites } = props,
    list = movies
      .map((item, index) =>
        <div key={ `movie-${item.key}` } className={ colWidth }>
          <Movie 
            title={ item.title } 
            poster={ `/img/${item.poster}` } 
            year={ item.year }
            movieId={ item.key }
            genreLinks={ getGenreLinkList(item.genres, genreOnClick, '') }
            addToFavoriteButton={
              <Button 
                onClick={ () => {
                  addMovieToFavorites(item.key, user.uid)
                } } 
                htmlType="button" 
                classes="btn-sm btn-flat-shadow" 
                icon={ <i className="fa fa-plus"></i> } 
                title=""
                color="info" 
              />              
            }
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
  addMovieToFavorites: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired, 
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  colWidth: PropTypes.string,
  genreOnClick: PropTypes.func,
  user: PropTypes.object
}

export default MovieList;