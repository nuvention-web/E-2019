const admin = require('firebase-admin');
const functions = require('firebase-functions');


admin.initializeApp(functions.config().firebase);
const auth = admin.auth();
// const playlistsRef = admin.database().ref('playlists');

module.exports = {
  Query: {
    helloword: () => 'ok',
    findUser(obj, args, context, info) {
      const email = args.email;
      return auth.getUserByEmail(email)
        .then((userRecord) => {
          const user = {
            "id" : userRecord.toJSON().uid,
            "name" : userRecord.toJSON().displayName,
            "photourl": userRecord.toJSON().photourl?userRecord.toJSON().photourl:""
          }
          // See the UserRecord reference doc for the contents of userRecord.
           return user
        }).catch((error)=> console.log(error));
    }
  },
};