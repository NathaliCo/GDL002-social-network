// Inicia Cloud Firestore a traves de Firebase
var db = firebase.firestore();

//editar documentos
function edit(id, name,){
	let saveBtn = document.querySelector(".saveBtn");

	document.querySelector(".name").value = name; 
	document.querySelector(".date").value = date;
	document.querySelector(".description").value = description;
	document.querySelector(".details").value = details;
	document.querySelector(".features").value = features;
	document.querySelector(".contact").value = contact;


	document.querySelector(".saveBtn") = saveBtn.innerHTML = 'edit';

	saveBtn.onclick = function(){
		let petTemplate = db.collection("users").doc(id);
		let posts = document.querySelector(".printInfo").value;
	



return petTemplate.update({
    name: name,
    date: date,
    description: description,
    details: details,
    features: features,
    contact: contact, 
})
.then(function() {
    console.log("Document successfully updated!");
    saveBtn.innerHTML = 'Editar';
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

	}
}

const lostForm= () =>{
  onNavItemClick("/postLost");
}
showLostPet=()=>{
  onNavItemClick("/lostPet").then(
    () => {
      printLostPets();
    }
  );
  
}
//Nuevo post para mascotas perdidas
function savePost(){
	let name = document.querySelector(".name").value;
	let date = document.querySelector(".date").value;
	let description = document.querySelector(".description").value;
	let details = document.querySelector(".details").value;
	let features = document.querySelector(".features").value;
	let contact = document.querySelector(".contact").value;
db.collection("users").add({ //agrega un ID automatico a cada usuario
    name: name,
    date: date,
    description: description,
    details: details,
    features: features,
    contact: contact, 

})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.querySelector(".name").value = "";
    document.querySelector(".date").value = "";
    document.querySelector(".description").value = "";
    document.querySelector(".details").value = "";
    document.querySelector(".features").value = "";
    document.querySelector(".contact").value = "";
    showLostPet();
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}


const printLostPets=()=>{
//leer documentos
let table = document.querySelector(".printInfo"); //es donde se va imprimir la info de los usuarios
console.log (table);
db.collection("users").onSnapshot((querySnapshot) => { /*el onSnapshot escucha  cada  vez que se haga un 
cambio en la base de datos, lo refleja en la página */
	table.innerHTML = ""; /*es para que la table de HTML, este vacía y se vayan agregando los 
	nuevos usuarios porque sino va a repetir los datos */
    querySnapshot.forEach((doc) => { //es el ciclo que se va repitiendo por c/u de los objetos creados
        console.log(`${doc.id} => ${doc.data().name}`);
        //es para que jale la data de c/ usuario y la imprima en pantalla
        table.innerHTML += `
        <tr>
        <td>Nombre: ${doc.data().name}</td><br>
        <td>Visto por última vez: ${doc.data().date}</td><br>
        <td>Descripción: ${doc.data().description}</td><br>
        <td>Placa/Collar/Ropa: ${doc.data().details}</td><br>
        <td>Señas particulares: ${doc.data().features}</td><br>
        <td>Contacto: ${doc.data().contact}</td><br>
        <td><button class="btnDanger" onclick= eliminate('${doc.id}')>Eliminar</button></td>
        <td><button class="btnsWarning" onclick= edit('${doc.id}', '${doc.data().name}', '${doc.data().date}', '${doc.data().description}', '${doc.data().details}', '${doc.data().features}', '${doc.data().contact}')>Editar</button></td><br>
        </tr> `;
    });
});
}
//borrar documentos
function eliminate(id){
	db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
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

const firebaseNewAccount = (email, password, name) => {
   name =document.querySelector(".createAccountName").value;
  email = document.querySelector(".createAccountEmail").value;
 password = document.querySelector(".createAccountPassword").value;
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
 document.querySelector(".btn").setAttribute("class", "btnCreateAccount modalBtn");

    });
}



const socialNetwork = {
  pageLogIn: pageLogIn,
  pageCreateAccount: pageCreateAccount,
  btnLogIn: btnLogIn,
  firebaseNewAccount: firebaseNewAccount,
  close: close,
  showLostPet: showLostPet,
  lostForm:lostForm,
  savePost:savePost,

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
    else if (window.location.pathname == "/createAccount") {
      allButtons[i].addEventListener("click", function (event) {
        socialNetwork[event.target.dataset.next](document.getElementById(event.target.attributes.dataFirst.value).value,
          document.getElementById(event.target.attributes.dataSecond.value).value, document.getElementById(event.target.attributes.dataThird.value).value);
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
  '/postLost': `./pages/postLost.html`,
};

window.onpopstate = () => {
  fetchContent(routes[window.location.pathname])
    .then(html => contentDiv.innerHTML = html);
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  return fetchContent(routes[window.location.pathname])
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
    displayName: document.querySelector(".createAccountName").value
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
