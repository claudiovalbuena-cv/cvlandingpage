import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

function initializeFirebase() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    // Try to initialize with environment variables first (ideal for Vercel/Production)
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
        try {
            // Robust private key formatting for Vercel
            // Vercel sometimes adds literal \n or double quotes
            let formattedKey = privateKey.replace(/\\n/g, '\n');
            if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
                formattedKey = formattedKey.slice(1, -1);
            }

            return admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: formattedKey,
                }),
            });
        } catch (error) {
            console.error('Error initializing Firebase with environment variables:', error);
            // Fallback to file below if this fails
        }
    }

    // Fallback to serviceAccountKey.json for local development
    try {
        const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');

        if (fs.existsSync(serviceAccountPath)) {
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
            return admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
    } catch (error) {
        console.error('Firebase Admin initialization error (file fallback):', error);
    }
}

// Export functions that ensure initialization
export const getDb = () => {
    initializeFirebase();
    return admin.firestore();
};

export const getAuth = () => {
    initializeFirebase();
    return admin.auth();
};
