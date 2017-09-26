import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'

import MovieDetail from '../MovieDetail/MovieDetail'
import Spinner from '../Spinner/Spinner'

//import utils from '../../scripts/utils.js'

class MovieDetailPage extends Component {

  state = {
    movie: undefined,
  }

  componentDidMount() {   
    this.getMovieFromFirebase(this.props.match.params.movieId)
  } 

  componentWillMount() { 
    //console.log(this.props.match.params.movieId)
    //this.props.match.params.movieId === undefined ?
  }

  componentWillReceiveProps(nextProps) { 
    //console.log('componentWillReceiveProps')
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdate')
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate')  
    //console.log(prevProps.match.params.movieId) 
  } 

  componentWillUnmount() {
    firebase.database()
      .ref('movies')
      .off()   
    console.log('componentWillUnmount')      
  }         

  getMovieFromFirebase = (movieId) => {
    firebase.database()
      .ref(`movies/${movieId}`)
      .on('value', (snapshot) => {
        //console.log(snapshot.val())
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        //console.log(movie)
        console.log('Added movie!')
        this.setState({ movie: movie })  
      }) 
  }   

  getMoviesPropertyList(key) {
    return this.state.movies
      .map((movie) =>
        movie[key]
      )
  }  

  render() {
    const { movie } = this.state,
      { genres, match, getGenreLinkList, getActorList, genreOnClick } = this.props

    return ( 
      movie ?  
        <div className="row">
          <div className="col-md-10 push-md-1 MovieDetail">                 
            <MovieDetail
              movie={ movie }
              getGenreLinkList={ getGenreLinkList }
              genreOnClick={ genreOnClick }
              getActorList={ getActorList }
            />
          </div>
        </div>
        : 
        <Spinner />      
    )
  } 
}

MovieDetailPage.propTypes = {
  genres: PropTypes.array,
  genreOnClick: PropTypes.func,
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,    
  match: PropTypes.object
}

export default MovieDetailPage  