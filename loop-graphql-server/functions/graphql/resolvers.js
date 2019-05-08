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
            email: userRecord.toJSON().email,
            photourl: userRecord.toJSON().photourl
              ? userRecord.toJSON().photourl
              : "",
            type: "loop"
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
        .then(querySnapshot => {
          let docs = querySnapshot.docs;
          result = [...docs];
          result = result.reduce((a, c) => {
            a.push(c.data().id);
            return a;
          }, []);
          return result;
        });
    },
    findContacts(obj, args, context, info) {
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
        .then(querySnapshot => {
          let docs = querySnapshot.docs;
          result = [...docs];
          result = result.reduce((a, c) => {
            a.push({
              id: c.data().id,
              name: c.data().name,
              email: c.data().email,
              photourl: c.data().photourl,
              type: c.data().type ? c.data().type : "loop"
            });
            return a;
          }, []);
          return result;
        });
    },
    findUsersJourney(obj, args, context, info) {
      const userid = args.userid;
      let result = [];
      return store
        .collection("user")
        .doc(userid)
        .collection("journeys")
        .get()
        .then(querySnapshot => {
          let docs = querySnapshot.docs;
          result = [...docs];
          result = result.reduce((a, c) => {
            a.push({ id: c.data().id, name: c.data().journeyname });
            return a;
          }, []);
          return result;
        });
    },
    totalAllContacts(obj, args, context, info) {
      const userid = args.userid;
      let result = 0;
      return store
        .collection("user")
        .doc(userid)
        .collection("journeys")
        .get()
        .then(querySnapshot => {
          let docs = querySnapshot.docs;
          let tmp = [...docs];
          result = tmp.reduce((a, c) => {
            if (c.data().journeyname !== "Stranger") {
              a += c.data().totalContacts;
            }
            return a;
          }, 0);
          return result;
        });
    }
  },
  Mutation: {
    updateTPandARR(obj, args, context, info) {
      let input = args.input;
      const tparr = { tp: input.tp, arr: input.arr };
      new Promise(resolve => {
        store
          .collection("user")
          .doc(input.userid)
          .collection("journeys")
          .doc(input.journeyid)
          .update({ tp: input.tp, arr: input.arr })
          .then(() => {
            console.log("Document successfully updated!");
            return resolve(Object.assign({}, input));
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      });
      return tparr;
    },
    createFriend(obj, args, context, info){
      let input = args.input;
      let friend = {name: input.name, email: input.email, photourl: "", type:"manual"}
      let journeyref = store
        .collection("user")
        .doc(input.userid)
        .collection("journeys")
        .doc(input.journeyid)
      journeyref.get().then((querySnapshot)=>{
        let total = 0
        total = querySnapshot.data().totalContacts?querySnapshot.data().totalContacts:0;
        return total
      }).then((total)=>{
        return journeyref.update({totalContacts:total+1})
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error("Error creating document: ", error);
      });
      
      let ref = journeyref
        .collection("contacts")
        .doc();
        friend["id"] = ref.id
        return ref.set({ id: ref.id, name: input.name, email: input.email, photourl: "", type:"manual"})
          .then(() => {
            console.log("Document created!");
            return friend
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error("Error creating document: ", error);
          });
    },
    createLog(obj, args, context, info){
      let input = args.input;
      let ref = store
        .collection("logs")
        .doc(input.id)
        .collection("touchpoints")
        .doc(input.timestamp)
      return ref.set({notes: input.notes, timestamp: input.timestamp, type: input.type})
          .then(()=>{
            console.log("Document created")
            return true
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error("Error creating document: ", error);
            return false
          });  
    }
  }
};
