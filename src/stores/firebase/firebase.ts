import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const settings = { timestampsInSnapshots: true }

const firebaseConfig = {
    apiKey: "AIzaSyAx-jeagh01mpj0N7bZ_aYBJIo8U2UDIMg",
    authDomain: "myweb1-5e17f.firebaseapp.com",
    projectId: "myweb1-5e17f",
    storageBucket: "myweb1-5e17f.appspot.com",
    messagingSenderId: "719651678771",
    appId: "1:719651678771:web:618d30ef864d6856ba1146",
    measurementId: "G-F2MT4ZBHJ9"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
