import firebase from './firebase'

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
        .then((resp) => console.log('signInWithEmailAndPassword', resp))
        .catch((e) => console.log('error signInWithEmailAndPassword', e))
}

export const checkAuthStateChanged = (setIsLoggedIn) => {
    firebase.auth().onAuthStateChanged((status) => {
        if (status) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    })
}

export const logOutUser = () => {
    firebase.auth().signOut().then(() => console.log('logOutUser'))
}

export const setItem = (category, name, discription, price, imageUrl) => {
    firebase.firestore()
        .collection(category)
        .doc(name)
        .set({
            name,
            price,
            discription,
            category,
            imageUrl,
        }, { merge: true })

    firebase.firestore()
        .collection('ListCategories')
        .doc(category)
        .set({}, { merge: true })
}
// получаю массив категорий
export const getAllCollections = (setAllCollections, setAllBase) => {
    let collections = []
    let base
    firebase.firestore()
        .collection("ListCategories")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                collections.push(doc.id)
            })
            setAllCollections(collections)
            // console.log('getAllCollections', collections)
        })
        .then(() => {
            // console.log('getAllCollections 2й вызов', collections)
            collections.forEach((el) => {
                firebase.firestore()
                    .collection(el)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // console.log(doc.id, " => ", doc.data())
                            base = { ...base, [doc.id]: doc.data() }
                        })
                        setAllBase(base)
                    })
            })
        })
}

export const delItem = (item) => {
    // console.log(item)
    // console.log(Object.values(item))
    // console.log(item.category)
    // console.log(item.name)

    firebase.firestore()
        .collection(item.category).doc(item.name).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

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
// }