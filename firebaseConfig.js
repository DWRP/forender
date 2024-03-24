import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, get, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getDatabase(app);

export const setRenderConfigs = (data) => {
  set(ref(db, `userConfigs/${auth?.currentUser?.uid}`), {
    data,
  })
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((error) => {
      console.log(`Error saving data ${error}`);
    });
};

export const getRenderConfigs = async () => {
  try {
    return await get(ref(db, `userConfigs/${auth?.currentUser?.uid}`));
  } catch (err) {
    console.error(err);
  }
  return null
};
