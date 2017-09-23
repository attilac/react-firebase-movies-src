import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'

import MovieList from '../MovieList/MovieList.js'
import Spinner from '../Spinner/Spinner'

class MoviePage extends Component {

  state = {
    movies: [],
    moviesByGenre: [],
    genreId: ''
  }

  componentDidMount() { 
    this.getMoviesByGenre()    
  } 

  componentWillMount() {
    //this.getMoviesByGenre()  
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps) 
    //this.setState({ movies: [] })
  }

  getMoviesByGenre = () => {
    const genreId = this.props.match.params.genreName
    firebase.database()
      .ref('movies')
      .orderByChild(`genres/${genreId}`)
      .equalTo(true)
      .limitToLast(50)
      .on('child_added', (snapshot) => {
        let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })            
      }) 
  }         

  getMoviesFromFirebase = () => {
    firebase.database()
      .ref('movies')
      .limitToLast(50)      
      .on('child_added', (snapshot) => {
        //console.log(snapshot.key)
        let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
  }        

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.props
    return movies
      .filter(movie => movie.title
        .includes(searchTerm)) 
  }        
 
  render() {
    const { movies } = this.state,
      { searchTerm, genres } = this.props

    return ( 
      movies ?   
        <MovieList 
          movies={
            searchTerm ? 
              this.getMoviesBySearchTerm(movies) 
              : movies
          } 
          colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
          genres={genres}
        />   
        : 
        <Spinner />      
    )
  } 
}

MoviePage.propTypes = {
  genres: PropTypes.array,
  genre: PropTypes.string,
  searchTerm: PropTypes.string
}

export default MoviePage  