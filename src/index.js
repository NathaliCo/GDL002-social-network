const lostForm= () =>{
  onNavItemClick("/lostPet").then(() => {
      document.querySelector(".lostForm").style.display="block";
      document.querySelector("#lostForm").style.display="none";
    }).then (() => {
    var fileButton = document.querySelector("#fileButton");
  fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];
    console.log(file.name);
    var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
    var task = storageRef.put(file);
    
    var downloadURL = task.snapshot.ref.getDownloadURL().then(function (result){
      
      document.querySelector("#img").value =result;
  })
  });
})
}


// .then (()=>{
//   var fileButton = document.querySelector("#fileButton");
//   fileButton.addEventListener('change', function(e){
//     var file = e.target.files[0];
//     console.log(file.name);
//     var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
//     var task = storageRef.put(file);
//     var downloadURL = task.snapshot.ref.getDownloadURL().then((url) => {
   
//       this.picture= url;
// console.log(this.picture);

//     }).then(function(){
//       document.querySelector("#img").value = ;
//     })
// });

// onNavItemClick("/postLost");






const adoptionForm= () =>{
  onNavItemClick("/adoptionPets").then(
    () => {
      document.querySelector(".adoptionForm").style.display="block";
      document.querySelector("#adoptionForm").style.display="none";
    }).then (() => {
      var fileButton = document.querySelector("#fileButtonAdopt");
    fileButton.addEventListener('change', function(e){
      var file = e.target.files[0];
      console.log(file.name);
      var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
      var task = storageRef.put(file);
      
      var downloadURL = task.snapshot.ref.getDownloadURL().then(function (result){
        
        document.querySelector("#adoptImg").value =result;
    })
    });
  })
  }

showLostPet=()=>{
  onNavItemClick("/lostPet").then(
    () => {
      printLostPets();
      document.querySelector(".lostForm").style.display="none";
      document.querySelector("#lostForm").style.display="block";
    });
}





let contentDiv = document.querySelector('#firstContent');


function pageLogIn() {
  onNavItemClick("/logIn");
  console.log("DONE!!");
}

function pageCreateAccount() {
  onNavItemClick('/createAccount');
}

//Función que llama a la información que va dentro del formulario
function modal(message) {
  let btn = document.querySelector(".modalBtn");
  btn.classList.add("btn-primary")
  document.querySelector(".modal-body").innerHTML = message;

}




function showHelp (){
  onNavItemClick('/help');
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
//Si la sesión está iniciada en el navegador
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



// var fileButton = document.querySelector("#fileButton");
// fileButton.addEventListener('change', function(e){
//   var file = e.target.files[0];


//   console.log(file);
//   var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
//   var uploadTask = storageRef.put(file);
//   uploadTask.on ('state_changed', function(snapshot){
//   },function(error){
//   },function(){
//     var postKey = firebase.database().ref('lostsPets/').push().key;
//     var downloadURL =uploadTask.snapshot.downloadURL;
//     var updates = {};
//     var postData= {
//       url:downloadURL,
//       caption: $("#imageCaption").val(),
//     };
//     updates['/lostsPets/' + postKey] =postData;
//     firebase.database().ref().update(updates);
//     console.log (downloadURL);
//   });
// });
