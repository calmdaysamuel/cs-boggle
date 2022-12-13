import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getDocs } from "firebase/firestore";

import { collection, getFirestore, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN9c2U4WKacA4c3goSPTnEeEOtKjt1yQE",
  authDomain: "boggle-7baf0.firebaseapp.com",
  projectId: "boggle-7baf0",
  storageBucket: "boggle-7baf0.appspot.com",
  messagingSenderId: "1030726106493",
  appId: "1:1030726106493:web:f571fcd6abb04140626014",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const gamesQuery = query(collection(firestore, "games"));
export async function docsCall() {
  const docs = [];

  const gameSnapshot = await getDocs(gamesQuery);

  gameSnapshot.forEach((doc) => {
    docs.push({
      id: doc.id,
      data: doc.data(),
      grid: JSON.parse(doc.data().grid),
    });
  });

  return docs;
}
