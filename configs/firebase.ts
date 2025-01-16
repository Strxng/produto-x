import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_7o2dmDTfM-6bXeI4WzVHR4Am9uKYqns",
  authDomain: "produto-x-6a7f2.firebaseapp.com",
  projectId: "produto-x-6a7f2",
  storageBucket: "produto-x-6a7f2.firebasestorage.app",
  messagingSenderId: "900880544357",
  appId: "1:900880544357:web:5204e6756c7f49b8428c8c",
  measurementId: "G-MM6F9T0GSV",
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export { app, db };
