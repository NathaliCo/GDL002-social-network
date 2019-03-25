// var firebase = require("firebase");
//Sections ocultos
document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".aboutUs").style.display = "none";
document.querySelector(".modal ").style.display = "none";


//Función que llama al formulario para crear una nueva cuenta
function newAccount(){
  document.querySelector(".createAccountPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
}

document.querySelector(".createAccount").addEventListener("click", newAccount);

//Función que llama al formulario para ingresar a la cuenta
function logIn (){
  document.querySelector(".logInPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".logIn").addEventListener("click", logIn);

//Función que se ejecuta al dar click en crear una nueva cuenta
function createNewAccount(){
  const name =document.querySelector(".createAccountName").value;
const email = document.querySelector(".createAccountEmail").value;
const password = document.querySelector(".createAccountPassword").value;
  //Las validaciones que necesitas hacer
firebase.auth().createUserWithEmailAndPassword(email, password).then (function(){
  verify();
    })
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  modal(errorMessage);
  console.log("error createacount");
  document.querySelector(".btn").setAttribute("class", "btnCreateAccount modalBtn");
  // ...
});
 }

document.querySelector(".btnCreateAccount").addEventListener("click", createNewAccount);
//Función que se ejecuta al dar click en el botón de entrar
function btnLogIn(){
 
  const email= document.querySelector(".logInEmail").value;
  const password= document.querySelector(".logInPassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then (function(){
    observer();
    const message= "Redireccionando";
    modal(message);
    console.log(user);
      })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    modal(errorMessage);
    console.log("error log in");

    // ...
    document.querySelector(".insideFirstPage").style.display = "none";
  });
}

document.querySelector(".btnLogIn").addEventListener("click", btnLogIn);

//Función que permite saber si el usurio está activo, es decir que está dentro de su cuenta y abre la pantallad e la red social
function observer(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      activeUser (user);
      // User is signed in.
      var displayName = user.displayName;
      console.log(user);
      console.log(user.emailVerified);
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

//Función que desactiva los formularios de registro y de inicio de sesión y activa la pantalla de la red social
function activeUser (user){
  user = user;
 if (user.emailVerified){
 document.querySelector(".insideFirstPage").style.display = "block";
 document.querySelector(".logInPage").style.display = "none";
  }else{
    const errorMessage="Verifica tu cuenta";
    console.log("error active");
    modal(errorMessage);
  }
}

//Función para cerrar sesión
function close(){
  firebase.auth().signOut()
  .then (function(){
    document.querySelector(".insideFirstPage").style.display = "none";
    document.querySelector(".logInPage").style.display = "block";
  }).catch(function(error){
    console.log (error);
  })
}

document.querySelector(".btnLogOut").addEventListener("click", close);

document.querySelector(".logInPassword").addEventListener('keypress', logKey);
//Función del enter
function logKey(e) {
  key = (document.all) ? e.keyCode : e.which;
  if (key==13) btnLogIn();
}
//Función que muestra ¿Quienes somos? y ocualta las demás pantallas
function pageInformation (){
  document.querySelector(".aboutUs").style.display = "block";
  document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".pageInformation").addEventListener("click", pageInformation);

var user = firebase.auth().currentUser;
//Función que envía correo de verificación al usuario que se registra
function verify(){
  var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  modal("Te enviamos un  correo de autentificación");
  console.log("autentificación");
  document.querySelector(".logInPage").style.display = "block";
  document.querySelector(".createAccountPage").style.display = "none";
}).catch(function(error) {
  console.log ("error");
});
}

function modal(message){
  let btn=document.querySelector(".modalBtn");
  btn.classList.add("btn-primary")
  document.querySelector(".modal-body").innerHTML=message;
  
}
function googleAccount(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('https://www.googleapis.com/auth/drive');
  firebase.auth().signInWithRedirect(provider);
  //add the code below to your previous lines
  firebase.auth().getRedirectResult().then(function(authData) {
      console.log(authData);
  }).catch(function(error) {
      console.log(error);
  });
}

document.querySelector(".btnGoogle").addEventListener("click", googleAccount);




function facebookAccount(){
 //creo el provider de autenticación
var provider = new firebase.auth.FacebookAuthProvider();
 // opcionalmente modifico el scope
 provider.addScope('user_friends');
 // accedo al servicio de autenticación
var authService = firebase.auth();
// evento para el botón de login con facebook
 document.querySelector('.btnFacebook').addEventListener('click', function() {
 // autentico con Facebook
 authService.signInWithPopup(provider)
         .then(function(result) {
            //todo correcto
            console.log('autenticado usuario ', result.user);
        })         .catch(function(error) {
            console.log('Detectado un error:', error);
        });
}) 
}
 document.querySelector(".btnFacebook").addEventListener("click", facebookAccount);

 