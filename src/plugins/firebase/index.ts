import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: env.VITE_API_KEY,
    authDomain: env.VITE_AUTH_DOMAIN,
    projectId: env.VITE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET,
    messagingSenderId: String(env.VITE_MESSAGING_SENDER_ID),
    appId: env.VITE_APP_ID,
    measurementId: env.VITE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
