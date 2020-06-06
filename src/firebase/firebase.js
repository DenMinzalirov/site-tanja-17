import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyB2FJPEvnUVlN5vMYIBlMUizJABVg1BnyM",
    authDomain: "tanja-17.firebaseapp.com",
    databaseURL: "https://tanja-17.firebaseio.com",
    projectId: "tanja-17",
    storageBucket: "tanja-17.appspot.com",
    messagingSenderId: "460499042794",
    appId: "1:460499042794:web:7e3158c4fb0fab708a7293",
    measurementId: "G-HRJFCHK446"
}
// firebase.analytics();

export default firebase.initializeApp(firebaseConfig)