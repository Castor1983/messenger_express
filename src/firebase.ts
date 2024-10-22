import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {initializeApp} from "firebase/app";
import {configs} from "./configs/configs";


 export const firebase = getFirestore(initializeApp(configs.FIREBASE));
