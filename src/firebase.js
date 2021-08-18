import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBUS7Ad4h37wAey4asXez2aBiwG5uNZ9Ug",
    authDomain: "social-media-app-83624.firebaseapp.com",
    projectId: "social-media-app-83624",
    storageBucket: "social-media-app-83624.appspot.com",
    messagingSenderId: "43736662873",
    appId: "1:43736662873:web:d6d0d80862bc92db544248"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()

  const auth = firebase.auth()

  const storage = firebaseApp.storage()
  
  const provider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    auth,
    provider,
    storage,
}