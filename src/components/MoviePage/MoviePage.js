import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../firebase.js'

import MovieList from '../MovieList/MovieList.js'
import Spinner from '../Spinner/Spinner'

import utils from '../../scripts/utils.js'

class MoviePage extends Component {

  state = {
    movies: [],
    moviesByGenre: []
  }

  componentDidMount() {   
    //this.getMoviesByGenre(this.props.match.params.genreName)
  } 

  componentWillMount() { 
    //console.log(this.props.match.params.genreName)
    this.props.match.params.genreName === undefined ?
      this.getMoviesFromFirebase()
      :
      this.getMoviesByGenre(this.props.match.params.genreName)
  }

  componentWillReceiveProps(nextProps) { 
    //console.log('componentWillReceiveProps')
    if(nextProps.match.params.genreName === undefined){
      this.getMoviesFromFirebase()
    } else if (nextProps.match.params.genreName !== this.props.match.params.genreName) { 
      this.setState({ movies: [] })
      this.getMoviesByGenre(nextProps.match.params.genreName)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdate')
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate')  
    //console.log(prevProps.match.params.genreName) 
  } 

  componentWillUnmount() {
    firebase.database()
      .ref('movies')
      .off()   
    console.log('componentWillUnmount')      
  } 

  getMoviesByGenre = (genreId) => {
    let movies = []
    firebase.database()
      .ref('movies')
      .orderByChild(`genres/${genreId}`)
      .equalTo(true)
      .limitToLast(12)
      .on('child_added', (snapshot) => {
        //let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
      /*
      .on('value', (snapshot) => {
        //console.log(snapshot.val())      
        let movies = []
        for (var prop in snapshot.val()) {
          let movie = snapshot.val()[prop]
          movie['key'] = prop
          movies.push(movie)
        } 
        this.setState({ movies: movies })
        console.log('Fetched Movies!')
      })  
      */        
  }         

  getMoviesFromFirebase = () => {
    let movies = []
    firebase.database()
      .ref('movies')
      //.orderByChild('year')
      .limitToLast(12)      
      .on('child_added', (snapshot) => {
        //console.log(snapshot.key)
        //let movies = [...this.state.movies]
        const movie = snapshot.val()
        movie['key'] = snapshot.key   
        movies.push(movie)
        //console.log(movies)
        //console.log('Added movie!')
        this.setState({ movies: movies })  
      }) 
  }  

  getMoviesFromHeroku() {
    fetch('https://fend-api.herokuapp.com/movies')
      .then(response => response.json())
      .then(json => { 
        // console.log(json)
        const moviesSorted = utils.sortObjectsByKey(json, 'year', 'DESC')
        this.setState({ movies: moviesSorted })
        this.setState({ genres: this.getGenresFromDatabase() })
        // console.log(this.state.movies)
      })
  }        

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.props
    return movies
      .filter(movie => movie.title
        .includes(searchTerm)) 
  }  

  getMoviesPropertyList(key) {
    return this.state.movies
      .map((movie) =>
        movie[key]
      )
  }  
  
  getGenresFromDatabase() {
    return utils.sortArray(utils.getUniqueArray(utils.getConcatArray(this.getMoviesPropertyList('genres'))))
  }         
 
  render() {
    const { movies } = this.state,
      { searchTerm, genres, genreOnClick, getGenreNameFromKey, getGenreLinkList, getActorList } = this.props
    utils.sortObjectsByKey(movies, 'releaseDate', 'DESC' )

    return ( 
      movies.length ?   
        <MovieList 
          movies={
            searchTerm ? 
              this.getMoviesBySearchTerm(movies) 
              : movies
          } 
          colWidth="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4"
          genres={ genres }
          genreOnClick={ genreOnClick }
          getGenreNameFromKey={ getGenreNameFromKey }
          getGenreLinkList={ getGenreLinkList }
          getActorList={ getActorList }          
        />   
        : 
        <Spinner />      
    )
  } 
}

MoviePage.propTypes = {
  genres: PropTypes.array,
  genre: PropTypes.string,
  genreOnClick: PropTypes.func,
  getGenreNameFromKey: PropTypes.func,
  getGenreLinkList: PropTypes.func,
  getActorList: PropTypes.func,  
  match: PropTypes.object,
  searchTerm: PropTypes.string
}

export default MoviePage  