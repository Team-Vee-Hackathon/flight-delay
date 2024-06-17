
var admin = require("firebase-admin");

var serviceAccount = require("./fb-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;