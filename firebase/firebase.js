// config/firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/syco-fusion-firebase-adminsdk-w9wgz-1df272d0d1.json');
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET // Use uppercase for env variable convention
});

const bucket = admin.storage().bucket();

module.exports = bucket;