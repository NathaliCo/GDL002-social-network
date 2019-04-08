 function logKey(e) {
    key = (document.all) ? e.keyCode : e.which;
    if (key==13) btnLogIn();
  }


function pageInformation (){
  onNavItemClick(`/aboutUs`);
  }
   document.querySelector(".pageInformation").addEventListener("click", pageInformation);
  
function goWelcomePage (){
  onNavItemClick(`/firstPage`);
    }
    

const endSesion =()=>{
  onNavItemClick(`/firstPage`);
  close();
}
document.querySelector(".btnLogOut").addEventListener("click", endSesion);

const homePage=()=>{
  let postArray=[];
  console.log (postArray);
  onNavItemClick(`/home`).then(function(){
 let mypostLost=document.querySelector(".postsLost"); 
 let mypostAdopt=document.querySelector(".postsAdopt");
 mypostLost.innerHTML = "";
 mypostAdopt.innerHTML = "";
  db.collection("lostsPets").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      printLostPets(mypostLost);
      postArray.push(doc);
    });
  });
  db.collection("adoptionPets").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      printAdoptionPets(mypostAdopt);
      postArray.push(doc);
    });
  });
  })/*.then(function(){
    setTimeout(function(){
     let hidenButtons= document.querySelectorAll(".hidden");
     hidenButtons.forEach(function(element) {
      element.style.display= "none";
     });
  },100)
  })*/
}

