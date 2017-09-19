import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import firebase from './firebase.js'
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
//import Navbar from './components/Navbar/Navbar.js'
import SiteHeader from './components/SiteHeader/SiteHeader.js'
//import InputField from './components/InputField/InputField.js'
//import UserDropdown from './components/UserDropdown/UserDropdown.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieList from './components/MovieList/MovieList.js'
//import DropdownSelect from './components/DropdownSelect/DropdownSelect.js'
//import GenreDropdownMenu from './components/GenreDropdownMenu/GenreDropdownMenu.js'
import PropsRoute from './components/PropsRoute/PropsRoute.js'
import ScrollToTop from './components/ScrollToTop.js'
import Spinner from './components/Spinner/Spinner'
import utils from './scripts/utils.js'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'

//import DummyComp from './components/DummyComp.js';

class App extends Component {

  state = {
    errorMessage: '',
    genres: [],
    movies: [],
    moviesByGenre: [],
    password: '',
    searchTerm: '',
    user: undefined,
    username: ''
  }

  componentDidMount() {
    this.getDataFromApi()

    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          //const displayName = user.displayName;
          const email = user.email;
          //const emailVerified = user.emailVerified;
          //const photoURL = user.photoURL;
          //const uid = user.uid; //KEY! UID!         
          this.setState({ 
            user: user,
            username: email
          })
          console.log(user)
        } else {
          this.setState({ 
            user: user,
            username: ''
          })          
        }
      })
  } 

  componentWillUnmount() {
    firebase
      .auth()
      .unsubscribeAuthStateChanged()
  } 

  createUser = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error)) 
  }

  loginUser = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error)) 
  }  

  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log(error)
      }) 
  }   

  onFormSubmit = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch(error => {
        const errorMessage = error.message
        //const errorCode = error.code
        this.setState({ errorMessage: errorMessage})
        console.log(errorMessage)
      }) 
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
    const { searchTerm, movies, genres } = this.state,
      { username, user, errorMessage } = this.state
    return (
      <Router> 
        <ScrollToTop>
          <div className="App">        
            {                        
              user === undefined ?
                null       
                :     
                <PropsRoute
                  path="/"
                  component={ SiteHeader }
                  user={ user }
                  username={ username }
                  navbarTitle={ 'React Movies' }
                  genres={ genres }
                  searchOnSubmit={ this.searchOnSubmit }
                  searchOnChange={ this.searchOnChange }
                  logOutUser={ this.logOutUser }
                />                                                 
            } 

            <main>                 
              <div className="container-fluid">
                {
                  user === undefined ?
                    <Spinner />
                    :           
                    <Switch>
                      <Route path='/login' render={({ match }) => (
                        user ? (
                          <Redirect to="/"/>
                        ) : (
                          <LoginPage >
                            <LoginForm 
                              submitBtnLabel="Log in" 
                              errorMessage={ errorMessage }
                              onFormSubmit={ this.onFormSubmit } 
                            />
                          </LoginPage> 
                        )
                      )}/>                       

                      <Route exact path='/' render={({ match }) => (
                        user ? (
                          <MovieList 
                            movies={
                              searchTerm ? 
                                this.getMoviesBySearchTerm(movies) 
                                : movies
                            } 
                            colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                          />                          
                        ) : (
                          <Redirect to="/login"/>
                        )                  
                      )}/>

                      <Route path='/genre/:genreName' render={({ match }) => (
                        user ? (
                          <MovieList 
                            movies={ 
                              searchTerm ? 
                                this.getMoviesBySearchTerm(this.getMoviesByGenre(match.params.genreName)) 
                                :
                                this.getMoviesByGenre(match.params.genreName)
                            } 
                            colWidth="col-6 col-sm-3 col-md-3 col-lg-2 mb-4"
                          />                          
                        ) : (
                          <Redirect to="/login"/>                        
                        )                    
                      )}/>
                     
                    </Switch>   
                }
              </div>  
            </main>          
          </div>
        </ScrollToTop>
      </Router>          
    )
  }
}

export default App