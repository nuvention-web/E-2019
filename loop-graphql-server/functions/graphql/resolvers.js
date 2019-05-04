const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);
const auth = admin.auth();
const store = admin.firestore();

// const playlistsRef = admin.database().ref('playlists');

module.exports = {
  Query: {
    helloword: () => "ok",
    findUser(obj, args, context, info) {
      const email = args.email;
      return auth
        .getUserByEmail(email)
        .then(userRecord => {
          const user = {
            id: userRecord.toJSON().uid,
            name: userRecord.toJSON().displayName,
            photourl: userRecord.toJSON().photourl
              ? userRecord.toJSON().photourl
              : ""
          };
          // See the UserRecord reference doc for the contents of userRecord.
          return user;
        })
        .catch(error => console.log(error));
    },
    findContactsId(obj, args, context, info) {
      const userid = args.userid;
      const journeyid = args.journeyid;
      let result = [];
      return store
      .collection("user")
      .doc(userid)
      .collection("journeys")
      .doc(journeyid)
      .collection("contacts")
      .get()
      .then((querySnapshot)=>{
        let docs = querySnapshot.docs;
        result=[...docs];
        result = result.reduce((a,c)=>{
          a.push(c.data().id)
          return a
        },[])
        return result;
      });
    },
  }
};
