import firebase from "./firebase";

// create form no use

// export const createUser = (user, password) => {
//     firebase
//         .auth()
//         .createUserWithEmailAndPassword(user, password)
//         .then((resp) => console.log('signInWithEmailAndPassword', resp))
//         .catch((e) => console.log('error signInWithEmailAndPassword', e))
// }

export const setUser = (user, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user, password)
    .then((resp) => console.log("signInWithEmailAndPassword", resp))
    .catch((e) => console.log("error signInWithEmailAndPassword", e));
};

export const checkAuthStateChanged = (setIsLoggedIn) => {
  firebase.auth().onAuthStateChanged((status) => {
    if (status) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
};

export const logOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("logOutUser"));
};

export const setItem = (
  category,
  name,
  discription,
  price,
  imageUrl,
  allDiscription,
  brand
) => {
  firebase.firestore().collection(category).doc(name).set(
    {
      name,
      price,
      discription,
      category,
      imageUrl,
      allDiscription,
      brand,
    },
    { merge: true }
  );
  firebase
    .firestore()
    .collection("ListCategories")
    .doc(category)
    .set({}, { merge: true });
};
// прослушиватель
export const listenAllBase = (setAllCollections, setAllBase) => {
  let collections = [];
  let base;
  firebase
    .firestore()
    .collection("ListCategories")
    .onSnapshot((doc) => {
      doc.docs.forEach((doc) => {
        // console.log("push");
        collections.push(doc.id);
      });
      setAllCollections(collections);
      collections.forEach((el) => {
        firebase
          .firestore()
          .collection(el)
          .onSnapshot((doc) => {
            doc.docs.forEach((el) => {
              // console.log(el.id, " => ", el.data());
              base = { ...base, [el.id]: el.data() };
            });
            setAllBase(base);
            // console.log(base);
          });
      });
      collections = [];
    });
};

// получаю массив категорий
// export const getAllCollections = (setAllCollections, setAllBase) => {
//   let collections = [];
//   let base;
//   firebase
//     .firestore()
//     .collection("ListCategories")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.id);
//         collections.push(doc.id);
//       });
//       // console.log(collections);
//       // setAllCollections(collections);
//       // console.log('getAllCollections', collections)
//     })
//     .then(() => {
//       // console.log('getAllCollections 2й вызов', collections)
//       collections.forEach((el) => {
//         firebase
//           .firestore()
//           .collection(el)
//           .get()
//           .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//               // console.log(doc.id, " => ", doc.data())
//               base = { ...base, [doc.id]: doc.data() };
//             });
//             // setAllBase(base);
//           });
//       });
//     });
// };

export const delCategory = (category) => {
  console.log(category);
  firebase
    .firestore()
    .collection("ListCategories")
    .doc(category)
    .delete()
    .then(function () {
      // console.log("Document successfully deleted!");
      firebase
        .firestore()
        .collection(category)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            firebase
              .firestore()
              .collection(category)
              .doc(doc.id)
              .delete()
              .then(function () {
                console.log(
                  "Document successfully deleted!: ",
                  doc.id,
                  " => ",
                  doc.data()
                );
              });
          });
        });
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

export const delItem = (item) => {
  firebase
    .firestore()
    .collection(item.category)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.docs.length <= 1) {
        delCategory(item.category);
      } else {
        firebase
          .firestore()
          .collection(item.category)
          .doc(item.name)
          .delete()
          .then(function () {
            console.log("Document successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      }
      // console.log(querySnapshot.docs.length);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  // document.location.reload(true);
  //   firebase
  //     .firestore()
  //     .collection(item.category)
  //     .doc(item.name)
  //     .delete()
  //     .then(function () {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error removing document: ", error);
  //     });
  // };
  // export const getAllBase = (setAllBase, category) => {
  //     console.log('getAllBase', category)
  //     let base = {}
  //     firebase.firestore()
  //         .collection('Коляски')
  //         .get()
  //         .then((querySnapshot) => {
  //             querySnapshot.forEach((doc) => {
  //                 base = { ...base, [doc.id]: doc.data() }
  //                 // console.log(doc.id, " => ", doc.data())
  //             })
  //             // console.log(base)
  //             setAllBase(base)
  //         })
};
