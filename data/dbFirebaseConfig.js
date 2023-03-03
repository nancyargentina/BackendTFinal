const {config}= require('../config')
let admin = require("firebase-admin");

let serviceAccount = require(config.fireBaseConnectionString);
//conecto a firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const dbFirebase = admin.firestore()
module.exports= dbFirebase