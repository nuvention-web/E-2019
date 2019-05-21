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
            photourl: userRecord.toJSON().photoURL
              ? userRecord.toJSON().photoURL
              : "",
            type: "loop",
            company: "",
            jobtitle: "",
            phonenumber: userRecord.toJSON().phoneNumber  ? userRecord.toJSON().phoneNumber : "",
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
    findAllContacts(obj, args, context, info){
      const userid = args.userid;
      let result = [];
      return store
        .collection("user")
        .doc(userid)
        .collection("wholeContacts")
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
              type: c.data().type ? c.data().type : "loop",
              company: c.data().company ? c.data().company : "",
              jobtitle: c.data().jottitle  ? c.data().jobtitle: "",
              phonenumber: c.data().phonenumber  ? c.data().phonenumber : "",
            });
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
              type: c.data().type ? c.data().type : "loop",
              company: c.data().company ? c.data().company : "",
              jobtitle: c.data().jottitle  ? c.data().jobtitle: "",
              phonenumber: c.data().phonenumber  ? c.data().phonenumber : "",
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
    createFriend(obj, args, context, info) {
      let input = args.input;
      let friend = {
        name: input.name,
        email: input.email,
        photourl: "",
        type: "manual",
        company: input.company,
        jobtitle: "",
        phonenumber: "",
      };
      let wholeContactref = store
      .collection("user")
      .doc(input.userid)
      .collection("wholeContacts");
      let journeyref = store
        .collection("user")
        .doc(input.userid)
        .collection("journeys")
        .doc(input.journeyid);
      journeyref
        .get()
        .then(querySnapshot => {
          let total = 0;
          total = querySnapshot.data().totalContacts
            ? querySnapshot.data().totalContacts
            : 0;
          return total;
        })
        .then(total => {
          return journeyref.update({ totalContacts: total + 1 });
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error creating document: ", error);
        });

      let ref = journeyref.collection("contacts").doc();
      friend["id"] = ref.id;
      return ref
        .set({
          id: ref.id,
          name: input.name,
          email: input.email,
          photourl: "",
          type: "manual",
          company: input.company
        })
        .then(() => {
          wholeContactref.doc(ref.id)
            .set({
              id: ref.id,
              name: input.name,
              email: input.email,
              photourl: "",
              type: "manual",
              company: input.company
            })
          console.log("Document created!");
          return friend;
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error creating document: ", error);
        });
    },
    createLog(obj, args, context, info) {
      let input = args.input;
      let ref = store
        .collection("logs")
        .doc(input.id)
        .collection("touchpoints")
        .doc();
      return ref
        .set({
          id: ref.id,
          notes: input.notes,
          timestamp: input.timestamp,
          type: input.type
        })
        .then(() => {
          console.log("Document created");
          return true;
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error creating document: ", error);
          return false;
        });
    },
    deleteFriend(obj, args, context, info){
      let input = args.input;
      let journeyref = store
        .collection("user")
        .doc(input.userid)
        .collection("journeys")
        .doc(input.journeyid);
      journeyref
      .get()
      .then(querySnapshot => {
        let total = 0;
        total = querySnapshot.data().totalContacts
          ? querySnapshot.data().totalContacts
          : 0;
        return total;
      }).then(total => {
        return journeyref.update({ totalContacts: total - 1 });
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error("Error creating document: ", error);
      });  
      return journeyref
        .collection("contacts")
        .doc(input.friendid)
        .delete()
        .then(()=>{
          return true
        }).catch(()=>{
          return false
        })
    },
    editFriend(obj, args, context, info){
      let input = args.input;
      let updated_info = {
        name: input.name,
        photourl : input.photourl,
        email: input.email,
        company: input.company,
        jobtitle: input.jobtitle,
        phonenumber: input.phonenumber
      }
      return store
        .collection("user")
        .doc(input.userid)
        .collection("journeys")
        .doc(input.journeyid)
        .collection("contacts")
        .doc(input.friendid)
        .update(updated_info)
        .then(()=>{
          return true
        })
        .catch((err)=>{
          console.log(err)
          return false
        })
    },
    importLinkedinConnection(obj, args, context, info){
      let userid = args.userid
      let input = args.input
      let journey = args.journey
      let userref = store
      .collection("user")
      .doc(userid)
      let wholeContactref = userref
      .collection("wholeContacts");
      return new Promise(resolve => {
      journey.forEach(jid=>{
        let cref = userref.collection("journeys").doc(jid)
        input.forEach(doc=>{
          wholeContactref.doc(doc.uid).set({id:doc.uid, name: doc.name, email: doc.email, company: doc.company, jobtitle: doc.position})
          cref.collection("contacts").doc(doc.uid).get()
          .then(docSnapshot=>{
            if(!docSnapshot.exists){
              cref.collection("contacts").doc(doc.uid).set({id:doc.uid, name: doc.name, email: doc.email, company: doc.company, jobtitle: doc.position})
              cref
              .get()
              .then(querySnapshot => {
                let total = 0;
                total = querySnapshot.data().totalContacts
                  ? querySnapshot.data().totalContacts
                  : 0;
                return total;
              })
              .then(total => {
                return cref.update({ totalContacts: total + 1 });
              })
              .catch(error => {
                // The document probably doesn't exist.
                console.error("Error creating document: ", error);
              });
            }
            return true
          }).catch(()=>{
            return false
          }
          )
        })
      })
      return resolve(Object.assign({}, input));
    }).then(()=>{
      return true
    })
    .catch(()=>{
    return false})
    }
  }
};
