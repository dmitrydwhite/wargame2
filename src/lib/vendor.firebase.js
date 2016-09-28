import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCVYmP8SxsA278Iv0rV6ayO25btKZqxuwk",
  authDomain: "war-card-game-project.firebaseapp.com",
  databaseURL: "https://war-card-game-project.firebaseio.com",
  storageBucket: "war-card-game-project.appspot.com",
  messagingSenderId: "880491706309"
};

var fB = firebase.initializeApp(config);

export default fB;