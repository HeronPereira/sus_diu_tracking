import { initializeApp } from 'firebase/app';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgvU-6O4doIbe3M0U3HCQelUorNfjaVD0',
  authDomain: 'diutrackingcontrol.firebaseapp.com',
  projectId: 'diutrackingcontrol',
  storageBucket: 'diutrackingcontrol.appspot.com',
  messagingSenderId: '855396614831',
  appId: '1:855396614831:web:77e3b48e60a6e7cdc94a5a',
  measurementId: 'G-M1ZQRMD85Q'
};

const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { storage, app as default };
