// var firebase = require("firebase");
//Sections ocultos
document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".aboutUs").style.display = "none";
document.querySelector(".modal ").style.display = "none";
document.querySelector(".secondHeader").style.display = "none";
document.querySelector(".secondFooter").style.display = "none";


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
  //Obtenemos los valores de los inputs
    const name =document.querySelector(".createAccountName").value;
    const email = document.querySelector(".createAccountEmail").value;
    const password = document.querySelector(".createAccountPassword").value;
    firebaseNewAccount(email, password);
}
document.querySelector(".btnCreateAccount").addEventListener("click", createNewAccount);

//Función que se ejecuta al dar click en el botón de entrar
function btnLogIn(){
  //Obtenemos los valores de los inputs
  const email= document.querySelector(".logInEmail").value;
  const password= document.querySelector(".logInPassword").value;
  firebaseLogIn(email,password);
}
document.querySelector(".btnLogIn").addEventListener("click", btnLogIn);

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

//Funció que llama a la información que va dentro del formulario
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

 /*Menú lateral*/
 function openNav() {
  document.getElementById("sideNavigation").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sideNavigation").style.width = "0";
}



