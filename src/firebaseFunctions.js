


//Función que para crear cuenta y validaciones de correo en formato correcto y contraseña
  const firebaseNewAccount =  (email, password)=> {
   firebase.auth().createUserWithEmailAndPassword(email, password).then (function(){
    verify();
      })
  .catch(function(error) {
     // Handle Errors here.
    let errorMessage = error.message;
   let errors= errorMessages (errorMessage);
     modal(errors);
    console.log("error createacount");
    document.querySelector(".btn").setAttribute("class", "btnCreateAccount modalBtn");
     // ...
  });
  }

 //Función que envía correo de verificación al usuario que se registra
// const verify = ()=>{
// let user = firebase.auth().currentUser;

//     user.updateProfile({
    
//     })
//     user.sendEmailVerification().then(function() {
//     modal("Te enviamos un  correo de autentificación");
// console.log("autentificación");
// document.querySelector(".logInPage").style.display = "block";
//     document.querySelector(".createAccountPage").style.display = "none";
//   }).catch(function(error) {
//     console.log ("error");
//   });
//   }

 //Función que se ejecuta al dar click en el botón de entrar
  const firebaseLogIn = (email,password)=>{
 
    firebase.auth().signInWithEmailAndPassword(email, password).then (function(){
       
      // document.querySelector("menuBtns").style.display = "block";
       observer();
        })
     .catch(function(error) {
       // Handle Errors here.
       let errorMessage = error.message;
        let logInError= errorMessages (errorMessage);
       modal(logInError);
       console.log(error.message);
       console.log(error);
  
       // ...
//      document.querySelector(".insideFirstPage").style.display = "none";
     });
    
   }

 //Función que permite saber si el usurio está activo, es decir que está dentro de su cuenta y abre la pantallad e la red social
const observer = () => {
   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         activeUser (user);
        // User is signed in.
        let displayName = user.displayName;
        console.log(user);
        console.log(user.emailVerified);
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        uid = user.uid;
         let providerData = user.providerData;
       } else {
      }
    });
  }

// //Función que desactiva los formularios de registro y de inicio de sesión y activa la pantalla de la red social
// const activeUser = (user) => {
//     user = user;
//    if (user.emailVerified){
//    document.querySelector(".insideFirstPage").style.display = "block";
//    document.querySelector(".logInPage").style.display = "none";
//     }else{
//       const errorMessage="Verifica tu cuenta";
//       console.log("error active");
//       modal(errorMessage);
//     }
//   }

// //Función para cerrar sesión
// const close = () =>{
//     firebase.auth().signOut()
//     .then (function(){
//       window.location.reload(true);
//     }).catch(function(error){
//       console.log (error);
//     })
//   }
  
 //Función para mostrar mensajes de error en español
 const errorMessages = (errorMessage)=>{
  switch (errorMessage) {
  case 'The password must be 6 characters long or more.':
     return "La contraseña debe tener al menos 6 dígitos";
  case 'The email address is badly formatted.':
    return "Introduce un email válido";   
    case "The email address is already in use by another account.":
    return "Este email ya está registrado";
  case "The password is invalid or the user does not have a password.":
    return "La contrseña es incorrecta";
  case "There is no user record corresponding to this identifier. The user may have been deleted.":
    return "No hay un usuario registrado con éste correo";
    break;
    default:
    return errorMessage;
}
  }
//   const sesiónIniciada=()=>{
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         document.querySelector(".welcomePage").style.display = "none";
//         document.querySelector(".firstHeader").style.display = "none";
//         document.querySelector(".firstFooter").style.display = "none";
//         document.querySelector(".secondHeader").style.display = "block";
//         document.querySelector(".secondFooter").style.display = "block";
//         document.querySelector(".insideFirstPage").style.display = "none";
//         document.querySelector(".createAccountPage").style.display = "none";
//         document.querySelector(".logInPage").style.display = "none";
//         document.querySelector(".aboutUs").style.display = "none";
//         document.querySelector(".modal ").style.display = "none";
        
//       } else {
//         // No user is signed in.
//       }
//     });
//   }
//   sesiónIniciada();
// //Publicaciones
  
//   // Initialize Cloud Firestore through Firebase
//   var db = firebase.firestore();

// const editProfile = () =>{
//   const name=document.querySelector(".userName").value;
//   const lastName=document.querySelector(".userLastName").value;
//   const age= document.querySelector (".ageUser").value;
//   db.collection("users").add({
//     first: name,
//     last: lastName,
//     born: age
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//     const name=document.querySelector(".userName").value = "";
//     const lastName=document.querySelector(".userLastName").value = "";
//     const age= document.querySelector (".ageUser").value = "";
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
// }
// //document.querySelector(".btnSave").addEventListener("click", editProfile);

// //post
// const newPostLostPet = () =>{
//   const name=document.querySelector(".petName").value;
//   const lastName=document.querySelector(".petColor").value;
//   const age= document.querySelector (".petAge").value;
//   db.collection("postLosts").add({
//     first: name,
//     last: lastName,
//     born: age
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//     const name=document.querySelector(".petName").value= "";
//     const lastName=document.querySelector(".petColor").value="";
//     const age= document.querySelector (".petAge").value="";
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
// }

// //document.querySelector(".btnPost").addEventListener("click",newPostLostPet );

// // const viewLosts = () =>{
// // db.collection("users").get().then((querySnapshot) => {
// //   querySnapshot.forEach((doc) => {
// //     document.querySelector(".lostPets").innerHTML= doc;
// //       console.log(`${doc.id} => ${doc.data()}`);
// //   });
// // });
// // }

// // viewLosts ();