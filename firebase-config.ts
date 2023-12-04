import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
	APIKEY,
	AUTHDOMAIN,
	PROJECTID,
	STORAGEBUCKET,
	MESSAGINGSENDERID,
	APPID,
	MEASUREMENTID,
} from "@env";

const firebaseConfig = {
	apiKey: APIKEY,
	authDomain: AUTHDOMAIN,
	projectId: PROJECTID,
	storageBucket: STORAGEBUCKET,
	messagingSenderId: MESSAGINGSENDERID,
	appId: APPID,
	measurementId: MEASUREMENTID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
