import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PRIVATE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PRIVATE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PRIVATE_FIREBASE_DATABASE,
  projectId: process.env.NEXT_PRIVATE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PRIVATE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PRIVATE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PRIVATE_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PRIVATE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
