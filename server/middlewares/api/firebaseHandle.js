
const admin = require('firebase-admin');
const serviceAccountKey = require('../../../internals/firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://playlysts.firebaseio.com'
});

module.exports = admin;
