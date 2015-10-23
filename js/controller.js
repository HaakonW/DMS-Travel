var controller = {};
var facebook = {};
var view = {};

$(document).ready(function(){
  window.fbAsyncInit = function() { FB.init({ appId: '1039844299401839', xfbml: true, version: 'v2.5'  });};
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // This is called with the results from from FB.getLoginStatus().
  controller.statusChangeCallback = function(response) {
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
      userLoggedIn = response.authResponse.userID;
      facebook.loadContent(userLoggedIn);
    } else if (response.status === 'not_authorized') { document.getElementById('status').innerHTML = 'Please log ' +  'into this app.';
  } else { document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook to get full access to Dms Travel.';
    }
  };
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  controller.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      controller.statusChangeCallback(response);
    });
  };
  window.fbAsyncInit = function() { FB.init({appId: '1039844299401839', cookie: true, xfbml: true, version: 'v2.4'});
    FB.getLoginStatus(function(response) { controller.statusChangeCallback(response);});
  };
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

});
//facebook.getIdDescforThumbs(view.getIdDescforThumbs);

// controller.displayThumbsCallback = function(url, description, numberOfLikes){
//   view.createThumbs(url, description, numberOfLikes);
// };

$(document).on("click", "#aboutBTN", function(){view.showAbout();});
$(document).on("click", "#docBTN", function(){view.showDoc();});
$(document).on("click", "#homeBTN", function(){facebook.loadContent();});
