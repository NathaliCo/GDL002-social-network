// // var firebase = require("firebase");
// //Sections ocultos
// document.querySelector(".modal ").style.display = "none";
// document.querySelector(".secondHeader").style.display = "none";
// document.querySelector(".secondFooter").style.display = "none";

// //Función que llama al formulario para crear una nueva cuenta
// function newAccount(){
//   document.querySelector(".createAccountPage").style.display = "block";
//   document.querySelector(".welcomePage").style.display = "none";
// }

// document.querySelector(".createAccount").addEventListener("click", newAccount);



// //Función que se ejecuta al dar click en crear una nueva cuenta
// function createNewAccount(){
//   //Obtenemos los valores de los inputs
//     const name =document.querySelector(".createAccountName").value;
//     const email = document.querySelector(".createAccountEmail").value;
//     const password = document.querySelector(".createAccountPassword").value;
//     firebaseNewAccount(email, password);
// }

// document.querySelector(".btnCreateAccount").addEventListener("click", createNewAccount);



//  function logKey(e) {
//    key = (document.all) ? e.keyCode : e.which;
//    if (key==13) btnLogIn();
//  }

// document.querySelector(".btnLogOut").addEventListener("click", close);

// document.querySelector(".logInPassword").addEventListener('keypress', logKey);
// //Función del enter

// //Función que muestra ¿Quienes somos? y ocualta las demás pantallas
// function pageInformation (){
//   document.querySelector(".aboutUs").style.display = "block";
//   document.querySelector(".insideFirstPage").style.display = "none";
// document.querySelector(".createAccountPage").style.display = "none";
// document.querySelector(".logInPage").style.display = "none";
// document.querySelector(".welcomePage").style.display = "none";
// }
// document.querySelector(".pageInformation").addEventListener("click", pageInformation);

// var user = firebase.auth().currentUser;



// function googleAccount(){
//   var provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope('profile');
//   provider.addScope('https://www.googleapis.com/auth/drive');
//   firebase.auth().signInWithRedirect(provider);
//   //add the code below to your previous lines
//   firebase.auth().getRedirectResult().then(function(authData) {
//       console.log(authData);
//   }).catch(function(error) {
//       console.log(error);
//   });
// }

// document.querySelector(".btnGoogle").addEventListener("click", googleAccount);


// function facebookAccount(){
//  //creo el provider de autenticación
// var provider = new firebase.auth.FacebookAuthProvider();
//  // opcionalmente modifico el scope
//  provider.addScope('user_friends');
//  // accedo al servicio de autenticación
// var authService = firebase.auth();
// // evento para el botón de login con facebook
//  document.querySelector('.btnFacebook').addEventListener('click', function() {
//  // autentico con Facebook
//  authService.signInWithPopup(provider)
//          .then(function(result) {
//             //todo correcto
//             console.log('autenticado usuario ', result.user);
//         })         .catch(function(error) {
//             console.log('Detectado un error:', error);
//         });
// }) 
// }
//  document.querySelector(".btnFacebook").addEventListener("click", facebookAccount);

//  /*Menú lateral*/
//  function openNav() {
//   document.getElementById("sideNavigation").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//   document.getElementById("sideNavigation").style.width = "0";
// }

// const profileUser=()=>{
//   document.querySelector(".profile").style.display = "block";
// }

// document.querySelector(".current").addEventListener("click", profileUser);

// const lostPets= ()=>{
//   document.querySelector(".lostPets").style.display="block";

// }
// document.querySelector(".lostBtn").addEventListener("click", lostPets);

// const postLostPet = () =>{
//   document.querySelector(".postLosts").style.display = "block";
// }

// document.querySelector (".postForm").addEventListener("click", postLostPet);



// if (window.location.pathname =="/firstPage"){
//   document.querySelector(".logIn").addEventListener("click", pageLogIn );
// }


//<button class="button jsBtn" data-next="logout" type="button" id="signIn">Log out</button>
//<button class="postButton jsBtn" data-next="publish" type="button" id="publish">Publish</button>
//<button class="button jsBtn" data-next="register" dataFirst="email" dataSecond="password" type="button" id="signUpBtn">Sign up!</button>
function pageInformation (){
  onNavItemClick('/aboutUs');
  }
   document.querySelector(".pageInformation").addEventListener("click", pageInformation);
  
    function goWelcomePage (){
      onNavItemClick(`/firstPage`);
    }
    document.querySelector(".homeBtn").addEventListener("click", goWelcomePage);

const endSesion =()=>{
  onNavItemClick(`/firstPage`);
  close();
}


document.querySelector(".btnLogOut").addEventListener("click", endSesion);


