import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgnyhv_YOlsZs-XKrMiIY_H-BaIHRFfAA",
  authDomain: 'artizanmobileverify.firebaseapp.com',
  projectId: 'artizanmobileverify',
  storageBucket: 'artizanmobileverify.firebasestorage.app',
  messagingSenderId: '889287217106',
  appId: '1:889287217106:web:27ae9397584b454b71020b'
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
