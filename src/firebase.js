// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3VHRP1CRdolwJWXFn1HOfFSrG6zJEPC8",
  authDomain: "dawntown-33844.firebaseapp.com",
  projectId: "dawntown-33844",
  storageBucket: "dawntown-33844.appspot.com",
  messagingSenderId: "723692885611",
  appId: "1:723692885611:web:9a2c93ff1753c74910832e",
  measurementId: "G-BCDPS9WMQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
