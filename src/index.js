showFormLostPet=()=>{
  onNavItemClick("/lostPet");
}
//post
const newPostLostPet = (petName, petColor, petAge) => {
  const name = document.querySelector(".petName").value;
  const lastName = document.querySelector(".petColor").value;
  const age = document.querySelector(".petAge").value;
  db.collection("postLosts").add({
    first: name,
    last: lastName,
    born: age
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);

    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}
//Función para cerrar sesión
const close = () => {
  firebase.auth().signOut()
    .then(function () {
      onNavItemClick(`/firstPage`)
      document.querySelector(".firstHeader").style.display = "block";
      document.querySelector(".firstFooter").style.display = "block";
      document.querySelector(".secondHeader").style.display = "none";
      document.querySelector(".secondFooter").style.display = "none";
      document.querySelector("#firstContent").style.display = "block";
      document.querySelector("#secondContent").style.display = "none";
    }).catch(function (error) {
      console.log(error);
    })
}

const firebaseNewAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    verify();
  })
    .catch(function (error) {
      // Handle Errors here.
      let errorMessage = error.message;
      let errors = errorMessages(errorMessage);
      modal(errors);
      console.log("error createacount");
      // ...
    });
}

const socialNetwork = {
  pageLogIn: pageLogIn,
  pageCreateAccount: pageCreateAccount,
  btnLogIn: btnLogIn,
  firebaseNewAccount: firebaseNewAccount,
  close: close,
  showFormLostPet: showFormLostPet,
  newPostLostPet: newPostLostPet,
  


};


const buttons = () => {

  const allButtons = document.querySelectorAll(".typeButton");
  console.log(allButtons);
  for (let i = 0; i < allButtons.length; i++) {
    if (window.location.pathname == "/logInPage" || window.location.pathname == "/createAccount") {

      allButtons[i].addEventListener("click", function (event) {
        socialNetwork[event.target.dataset.next](document.getElementById(event.target.attributes.dataFirst.value).value,
          document.getElementById(event.target.attributes.dataSecond.value).value);
      });
    }
    else {
      allButtons[i].addEventListener("click", function (event) {
        socialNetwork[event.target.dataset.next]();
      });
    }
  }

}

let contentDiv = document.querySelector('#firstContent');

let routes = {
  '/': `./pages/firstPage.html`,
  '/firstPage': `./pages/firstPage.html`,
  '/aboutUs': `./pages/aboutUs.html`,
  '/logIn': `./pages/logInPage.html`,
  '/createAccount': `./pages/createAccount.html`,
  '/lostPet': `./pages/lostPet.html`,
};

window.onpopstate = () => {
  fetchContent(routes[window.location.pathname])
    .then(html => contentDiv.innerHTML = html);
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  fetchContent(routes[window.location.pathname])
    .then(html => contentDiv.innerHTML = html)
    .then(() => buttons());
  console.log(pathName);
}

const fetchContent = (url) => fetch(url)
  .then(function (response) {

    return response.text()
  })
  .then(function (html) {


    return html;
  })
  .catch(function (err) {
    console.log('Failed to fetch page: ', err);
  });

fetchContent(routes[window.location.pathname])
  .then(html => contentDiv.innerHTML = html)
  .then(() => buttons());




function pageLogIn() {
  onNavItemClick("/logIn");
  console.log("DONE!!");
}

function pageCreateAccount() {
  onNavItemClick('/createAccount');
}


//Función que se ejecuta al dar click en el botón de entrar
function btnLogIn() {
  console.log("Hi");
  //Obtenemos los valores de los inputs
  const email = document.querySelector(".logInEmail").value;
  const password = document.querySelector(".logInPassword").value;
  firebaseLogIn(email, password);

}


const firebaseLogIn = (email, password) => {

  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {

    // document.querySelector("menuBtns").style.display = "block";
    observer();

  })
    .catch(function (error) {
      // Handle Errors here.
      let errorMessage = error.message;
      let logInError = errorMessages(errorMessage);
      modal(logInError);
      console.log(error.message);
      console.log(error);

      // ...

    });

}

//Función que llama a la información que va dentro del formulario
function modal(message) {
  let btn = document.querySelector(".modalBtn");
  btn.classList.add("btn-primary")
  document.querySelector(".modal-body").innerHTML = message;

}

//Función que desactiva los formularios de registro y de inicio de sesión y activa la pantalla de la red social
const activeUser = (user) => {
  user = user;
  if (user.emailVerified) {
  } else {
    const errorMessage = "Verifica tu cuenta";
    console.log("error active");
    modal(errorMessage);
  }
}

//Función que permite saber si el usurio está activo, es decir que está dentro de su cuenta y abre la pantallad e la red social
const observer = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      activeUser(user);
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


//Función para mostrar mensajes de error en español
const errorMessages = (errorMessage) => {
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

const sesiónIniciada = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.querySelector(".firstHeader").style.display = "none";
      document.querySelector(".firstFooter").style.display = "none";
      document.querySelector(".secondHeader").style.display = "block";
      document.querySelector(".secondFooter").style.display = "block";
      document.querySelector("#firstContent").innerHTML="";
    } else {
      document.querySelector(".firstHeader").style.display = "block";
      document.querySelector(".firstFooter").style.display = "block";
      document.querySelector(".secondHeader").style.display = "none";
      document.querySelector(".secondFooter").style.display = "none";
      // No user is signed in.
    }
  });
}
sesiónIniciada();

//Función que envía correo de verificación al usuario que se registra
const verify = () => {
  let user = firebase.auth().currentUser;

  user.updateProfile({
  })
  user.sendEmailVerification().then(function () {
    modal("Te enviamos un  correo de autentificación");
    console.log("autentificación");
  }).catch(function (error) {
    console.log("error");
  });
}

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();



// //document.querySelector(".btnPost").addEventListener("click",newPostLostPet );
