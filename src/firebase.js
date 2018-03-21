import Firebase from 'firebase'
import 'firebase/firestore'

let config = {
  apiKey: 'xxxxxxxx',
  authDomain: 'xxxxxxxx',
  databaseURL: 'xxxxxxxx',
  projectId: 'xxxxxxxx',
  storageBucket: '',
  messagingSenderId: 'xxxxxxxx'
}

export const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.firestore()