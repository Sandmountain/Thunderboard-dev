import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { DefaultSettings } from '../LoadSettings/DefaultSettings';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: 'chrome-dashboard-deploy.firebaseapp.com',
  databaseURL: process.env.REACT_APP_FIRESTORE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIRESTORE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: '400482503280',
  appId: process.env.REACT_APP_FIRESTORE_APP_ID,
  measurementId: 'G-920TKH773Z',
};

// apiKey: 'AIzaSyCihE5p75gUMWIa3cVQujtekOY7bq7OhVk',
// authDomain: 'chrome-dashboard-deploy.firebaseapp.com',
// databaseURL: 'https://chrome-dashboard-deploy.firebaseio.com',
// projectId: 'chrome-dashboard-deploy',
// storageBucket: 'chrome-dashboard-deploy.appspot.com',
// messagingSenderId: '400482503280',
// appId: '1:400482503280:web:d08487db6a9419bddd82b5',
// measurementId: 'G-920TKH773Z',

//Gets value on init.
let userID = '';

export const initFirestore = async (id, token, inProduction) => {
  userID = id;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const credential = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      return;
    } else {
      try {
        firebase.auth().signInWithPopup(credential);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const db = firebase.firestore();
  const docRef = db.collection('ExtensionSettings').doc(userID);

  return await docRef.get().then(function (doc) {
    if (doc.exists) {
      //There is data for the user
      //Set data to state
      return doc.data();
    } else {
      const defaultSettings = DefaultSettings();
      db.collection('ExtensionSettings')
        .doc(userID)
        .set(defaultSettings)
        .then(() => {
          console.log('loaded collection');
        })
        .catch((err) => console.log(err));
      return defaultSettings;
    }
  });
};

const logOut = () => {
  try {
    firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export const updateFirestoreCollection = (dataToUpdate) => {
  try {
    firebase.firestore().collection('ExtensionSettings').doc(userID).update(dataToUpdate);
  } catch (err) {
    console.log(err);
  }
};

export const removeFirebaseSettings = () => {
  try {
    firebase.firestore().collection('ExtensionSettings').doc(userID).delete();
    logOut();
    return 'Settings were successfully removed';
  } catch (err) {
    console.log(err);
    return "Data couldn't be removed";
  }
};
