import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import firebase from './firebase.js'

import Button from './components/Button/Button.js'
import LoginPage from './components/LoginPage/LoginPage.js'
import MovieDetailPage from './components/MovieDetailPage/MovieDetailPage.js'
import MoviePage from './components/MoviePage/MoviePage.js'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import PropsRoute from './components/PropsRoute/PropsRoute.js'
import PublicRoute from './components/PublicRoute/PublicRoute.js'
import ScrollToTop from './components/ScrollToTop.js'
import SiteHeader from './components/SiteHeader/SiteHeader.js'
import Spinner from './components/Spinner/Spinner'

//import utils from './scripts/utils.js'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './App.css'

class App extends Component {

  state = {
    errorMessage: '',
    favList: [],
    genre: '',
    genres: [],
    password: '',
    user: undefined,
    username: ''
  }

  componentDidMount() {

    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          //const displayName = user.displayName;
          const email = user.email;
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

  componentWillMount() { 
    this.getGenresFromFirebase()
    this.childAdded()
  }

  componentWillReceiveProps(nextProps) { 
  }

  componentWillUnmount() {
    firebase
      .auth()
      .unsubscribeAuthStateChanged()
  } 

  childAdded = () => {
    firebase.database()
      .ref('users_movies') 
      .on('child_added', (snapshot) => {
        let favList = [...this.state.favList]
        const favListItem = snapshot.val()
        favList['key'] = snapshot.key   
        favList.push(favListItem)
        //console.log(favList)
        console.log('Added movie to favlist!')
        this.setState({ favList: favList })   
      })
  }  

  childRemoved = () => {
    firebase.database()
      .ref('users_movies')
      .on('child_removed', (snapshot) => {
        //console.log(snapshot.key)
        let favList = [...this.state.favList]
          .filter( (item) => {
            return item.key !== snapshot.key    
          })
        console.log('Removed favlist item')
        this.setState({ favList: favList })
      }) 
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

  getGenresFromFirebase = () => {
    firebase.database()
      .ref('genres')   
      /*
      .on('child_added', (snapshot) => {
        let genres = [...this.state.genres]
        let genre = {
          key: snapshot.key,
          title:  snapshot.val().title
        }
        genres.push(genre)
        //console.log('Added genre!')
        this.setState({ genres: genres }) 
        //console.log(this.state.genres) 
      })   
      */    
      
      .once('value', (snapshot) => {
        //console.log(snapshot.val())      
        let genres = []
        for (var prop in snapshot.val()) {
          let genre = {
            key: prop,
            title: snapshot.val()[prop].title
          }
          genres.push(genre)
        } 
        //console.log(genres)  
        this.setState({ genres: genres })
        console.log('Fetched genres!')
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

  addMovieToFavorites = (movieId, userId) => {
    //console.log('Movie id ' + movieId)
    //console.log('User id ' + userId)

    firebase.database()
      .ref(`users_movies/user/${userId}`)
      .update(({ [movieId] : true })) 
      .then( () => {
        console.log('Pushed a new favlist item') 
      }) 
      .catch(error => { 
        console.log('There was an error', error) 
      })   

    firebase.database()
      .ref(`movies/${movieId}/users`)
      .update(({[userId] : true}))      
      .then( () => {
        console.log('Updated movie!') 
      }) 
      .catch(error => { 
        console.log('There was an error', error) 
      })                        
  } 

  removeMovieFromFavorites = (movieId, userId) => {
    firebase.database()
      .ref(`users_movies/user/${userId}/${movieId}`)
      .remove()
      .catch(error => { 
        console.log('There was an error', error) 
      }) 

    firebase.database()
      .ref(`movies/${movieId}/users/${userId}`) 
      .remove()          
      .catch(error => { 
        console.log('There was an error', error) 
      })       
  }  

  addFavoriteButton = (movie) => {
    const { user } = this.state,
      favoriteButton =  movie.users ?
        <Button 
          onClick={ () => {
            this.removeMovieFromFavorites(movie.key, user.uid)
          } } 
          htmlType="button" 
          classes="btn-sm btn-flat-shadow" 
          icon={ <i className="fa fa-minus"></i> } 
          title=""
          color="info" 
          titleText="Remove from my list"
        />
        :    
        <Button 
          onClick={ () => {
            this.addMovieToFavorites(movie.key, user.uid)
          } } 
          htmlType="button" 
          classes="btn-sm btn-flat-shadow" 
          icon={ <i className="fa fa-plus"></i> } 
          title=""
          color="info" 
          titleText="Add to my list"
        />,  
      output = user ?
        favoriteButton
        :
        <Link 
          to="/login"
          className="btn btn-info btn-sm btn-flat-shadow"
          title="Login to add to my list"
        >
          <i className="fa fa-plus"></i>
        </Link>       

    return output
  }  

  genreOnClick = (event) => {
    //console.log(event.target.innerHTML )
    this.setState({ genre: event.target.innerHTML })   
  } 

  getGenreNameFromKey = (key) => { 
    //console.log(this.state.genres)
    return this.state.genres
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
      }).join('')
  }

  getGenreLinkList = (mGenres, genreOnClick, classes) => {
    //console.log(classes)     
    const genreLinks = Object.keys(mGenres)
      .map((key, index) => {
        return (
          <li key={ index } className="list-inline-item movie-genre-item">
            <Link 
              className="genre-link" 
              to={ `/genre/${key}`} 
              onClick={ genreOnClick }
            >
              { this.getGenreNameFromKey(key)}
            </Link>
          </li>
        )
      })
    return <ul className={ `list-inline movie-genre-list ${classes}`}>
      { genreLinks }
    </ul>
  }

  getActorList = (actors) => {
    const listItems = actors
      .map((actor, index) => {
        return (
          <li key={ index } className="list-inline-item">
            { actor }
          </li>
        )
      }) 

    return (
      <ul className="list-inline font-size-sm">
        { listItems }
      </ul> 
    )
  }    

  render() {
    const { searchTerm, genres, genre } = this.state,
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
                  genreOnClick={ this.genreOnClick }
                  genre={ genre }
                />                                                 
            } 

            <main>                 
              <div className="container-fluid">
                {
                  user === undefined ?
                    <Spinner />
                    :           
                    <Switch>

                      <PublicRoute
                        path='/login'
                        component={ LoginPage }
                        user={ user }
                        submitBtnLabel="Log in" 
                        errorMessage={ errorMessage }
                        onFormSubmit={ this.onFormSubmit }  
                      />                         

                      <PrivateRoute
                        exact
                        path="/my-list"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                        getGenreNameFromKey={ this.getGenreNameFromKey }
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }
                        genreOnClick={ this.genreOnClick }
                        addMovieToFavorites={ this.addMovieToFavorites }
                        addFavoriteButton={ this.addFavoriteButton }
                        myList
                        heading="My List"
                      /> 

                      <PropsRoute
                        exact
                        path="/"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                        getGenreNameFromKey={ this.getGenreNameFromKey }
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }
                        genreOnClick={ this.genreOnClick }
                        addMovieToFavorites={ this.addMovieToFavorites }
                        addFavoriteButton={ this.addFavoriteButton }
                        heading="Movies"
                      /> 

                      <PropsRoute
                        exact
                        path="/genre/:genreName"
                        component={ MoviePage }
                        user={ user }
                        genres={ genres }
                        searchTerm={ searchTerm }
                        getGenreNameFromKey={ this.getGenreNameFromKey }    
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }  
                        genreOnClick={ this.genreOnClick } 
                        addMovieToFavorites={ this.addMovieToFavorites }     
                        addFavoriteButton={ this.addFavoriteButton }    
                      /> 

                      <PropsRoute
                        exact
                        path="/movie/:movieId"
                        component={ MovieDetailPage }
                        user={ user }
                        genres={ genres }
                        getGenreNameFromKey={ this.getGenreNameFromKey }  
                        getGenreLinkList={ this.getGenreLinkList }
                        getActorList={ this.getActorList }   
                        genreOnClick={ this.genreOnClick }  
                        addMovieToFavorites={ this.addMovieToFavorites }   
                        addFavoriteButton={ this.addFavoriteButton }            
                      />                                                                                      
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