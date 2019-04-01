let contentDiv = document.querySelector('#content');

let routes = {
    '/': `./pages/firstPage.html`,
    '/firstPage': `./pages/firstPage.html`,
     '/aboutUs': `./pages/aboutUs.html`,
     '/logIn': `./pages/logIn.html`,
     '/createAccount': `./pages/createAccount.html`,     
  };
    
window.onpopstate = () => {
  fetchContent(routes[window.location.pathname])
  .then(html => contentDiv.innerHTML = html);
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  fetchContent(routes[window.location.pathname])
  .then(html => contentDiv.innerHTML = html);
  console.log(pathName);
}

const fetchContent = (url) => fetch(url)
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        return html;
    })
    .catch(function(err) {
        console.log('Failed to fetch page: ', err);
    });

fetchContent(routes[window.location.pathname])
.then(html => contentDiv.innerHTML = html);


