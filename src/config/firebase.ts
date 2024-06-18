import * as admin from 'firebase-admin';
import serviceAccount from '../../fb-config.json'; // Assuming fb-config.json is in the same directory

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
}, 'admin');

export const db = admin.firestore();