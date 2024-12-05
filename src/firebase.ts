import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {initializeApp} from "firebase/app";
import multer from "multer";

import {configs} from "./configs/configs";

const app = initializeApp(configs.FIREBASE)
 export const firebase = getFirestore(app);
export const storage = getStorage(app);
 export const upload = multer({ storage: multer.memoryStorage() });
