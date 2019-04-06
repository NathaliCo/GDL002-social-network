function firebaseNewAccount () {
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
    
       });
    }
    var user = firebase.auth().currentUser;
    //Verificar cuenta
    //Función que envía correo de verificación al usuario que se registra
    const verify = () => {
      let user = firebase.auth().currentUser;
      console.log(user.displayName)
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
    
    //Iniciar sesión
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
        observer();
    
      }).then (function(){
        showLostPet();
      })
        .catch(function (error) {
          // Handle Errors here.
          let errorMessage = error.message;
          let logInError = errorMessages(errorMessage);
          modal(logInError);
          console.log(error.message);
          console.log(error);
          document.querySelector(".btn").setAttribute("class", "btnCreateAccount modalBtn");
          // ...
    
        });
    
    }
    //Función que permite saber si el usurio está activo, es decir que está dentro de su cuenta y abre la pantalla de la red social
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
    