import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA4Yq7OcaJ6GGR6111lRpbk437iVJYYXP0',
  authDomain: 'movie-database-df108.firebaseapp.com',
  databaseURL: 'https://movie-database-df108.firebaseio.com',
  projectId: 'movie-database-df108',
  storageBucket: 'movie-database-df108.appspot.com',
  messagingSenderId: '57061023306'
}
firebase.initializeApp(config);

export default firebase