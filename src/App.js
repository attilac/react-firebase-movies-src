import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Navbar from './components/Navbar/Navbar.js'
import InputField from './components/InputField/InputField.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieList from './components/MovieList/MovieList.js'
import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
import './App.css'
import utils from './scripts/utils.js'

class App extends Component {

  state = {
    genre: '',
    genres: [],
    isLoggedIn: true, 
    movies: [],
    moviesByGenre: [],
    password: '',
    searchTerm: '',
    username: ''
  }

  componentDidMount() {
    this.getDataFromApi()
    // console.log(this.state.movies)
  }   

  onFormSubmit = (username, password) => {
    this.setState({ username: username, 
      password: password,  
      isLoggedIn: true
    })
    console.log(this.state.username)
  } 


  getDataFromApi() {
    fetch('https://fend-api.herokuapp.com/movies')
      .then(response => response.json())
      .then(json => { 
        // console.log(json)
        const moviesSorted = utils.sortObjectsByKey(json, 'title')
        this.setState({ movies: moviesSorted })
        this.setState({ genres: this.getGenresFromDatabase() })
        // console.log(this.state.movies)
      })
  }

  searchOnSubmit = (event) => {
    if (event.key === 'Enter') {
      this.setState({ searchTerm: event.target.value })
    }      
  } 

  searchOnChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }  

  getMoviesByGenre = (event) => {
    const moviesFilteredByGenre = this.state.movies.filter(movie => 
      movie.genres.includes(event.target.innerHTML)
    )
    this.setState({   
      genre: event.target.innerHTML,
      moviesByGenre: moviesFilteredByGenre
    })     
  }

  getMoviesBySearchTerm(movies) {
    const { searchTerm } = this.state
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
    const { searchTerm, movies, genre, genres, moviesByGenre } = this.state,
      { password, username, isLoggedIn } = this.state,
      heading = genre ? <p> Movies in { genre } </p> : ''

    let moviesToRender = genre ? moviesByGenre : movies
    moviesToRender = searchTerm ? 
      this.getMoviesBySearchTerm(moviesToRender) 
      : moviesToRender

    return (
      <div className="App">

        <Navbar title="React Movies">
          { isLoggedIn &&
            <DropdownSelect 
              items={ genres } 
              onClick={ this.getMoviesByGenre } 
              currentItem={ genre } 
            /> 
          }
          { isLoggedIn &&
            <InputField 
              onSubmit={ this.searchOnSubmit } 
              onChange={ this.searchOnChange } 
              value={ searchTerm } 
              placeHolder="Find Movies" 
              classes="form-control font-weight-100" 
              name="movieSearch"
            />
          }
        </Navbar>  

        { !isLoggedIn &&
            <LoginPage >
              <LoginForm 
                submitText="Login" 
                isLoggedIn={ isLoggedIn } 
                onFormSubmit={ this.onFormSubmit } 
              />
            </LoginPage>
        }

        { isLoggedIn &&
          <div className="container-fluid">
            { /* <p> Hello { username } </p> */ }
            { /* greeting */ }
            <MovieList 
              movies={ moviesToRender } 
              colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4" 
            />  
          </div>
        }  
      </div>
    )
  }
}

export default App
