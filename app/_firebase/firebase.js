'use client';

import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
import firebaseConfig from './config';
import {initializeAnalytics} from './analytics';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const database = getDatabase(app);
export const storage = getStorage(app);
