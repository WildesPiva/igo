// firebaseAdmin.ts

import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.NEXT_PRIVATE_KEY,
            clientEmail: process.env.NEXT_PRIVATE_EMAIL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
}


const auth = firebaseAdmin.auth()
const database = firebaseAdmin.database()

export { firebaseAdmin, auth, database };