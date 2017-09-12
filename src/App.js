import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Navbar from './components/Navbar/Navbar.js'
import InputField from './components/InputField/InputField.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieList from './components/MovieList/MovieList.js'
import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
import ScrollToTop from './components/ScrollToTop.js';
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
        const moviesSorted = utils.sortObjectsByKey(json, 'year', 'DESC')
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

  genreOnClick = (event) => {
    this.setState({ genre: event.target.innerHTML })   
  }

  getMoviesByGenre = (genre) => {
    const { movies } = this.state
    return movies
      .filter(movie => 
        movie.genres.includes(genre)
      )
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
    const { searchTerm, movies, genre, genres } = this.state,
      { password, username, isLoggedIn } = this.state
    return (
      <Router> 
        <ScrollToTop>
          <div className="App">
            <Route path='/' render={({ location }) => (
              <Navbar title="React Movies">
                { isLoggedIn &&
                  <DropdownSelect 
                    items={ genres } 
                    currentItem={ 
                      location.pathname !== '/' ? 
                        location.pathname.substring(location.pathname.lastIndexOf('/') + 1) 
                        : genre 
                    } 
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
            )}/>
            <main>
                 
              <div className="container-fluid">
                <Switch>

                  <Route path='/login' render={() => (
                    isLoggedIn ? (
                      <Redirect to="/"/>
                    ) : (
                      <LoginPage >
                        <LoginForm 
                          submitText="Login" 
                          isLoggedIn={ isLoggedIn } 
                          onFormSubmit={ this.onFormSubmit } 
                        />
                      </LoginPage> 
                    )
                  )}/>   

                  <Route exact path='/' render={({ match }) => (
                    !isLoggedIn ? (
                      <Redirect to="/login"/>
                    ) : (
                      <MovieList 
                        movies={
                          searchTerm ? 
                            this.getMoviesBySearchTerm(movies) 
                            : movies
                        } 
                        colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                      />
                    )                  
                  )}/>

                  <Route path='/genre/:genreName' render={({ match }) => (
                    !isLoggedIn ? (
                      <Redirect to="/login"/>
                    ) : (
                      <MovieList 
                        movies={ 
                          searchTerm ? 
                            this.getMoviesBySearchTerm(this.getMoviesByGenre(match.params.genreName)) 
                            :
                            this.getMoviesByGenre(match.params.genreName)
                        } 
                        colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                      />
                    )                    
                  )}/>
                 
                </Switch>   
              </div>  

            </main>          
          </div>
        </ScrollToTop>
      </Router>          
    )
  }
}

export default App