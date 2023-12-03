import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
