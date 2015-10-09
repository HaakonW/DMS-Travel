  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1039844299401839',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

     // This is called with the results from from FB.getLoginStatus().
     function statusChangeCallback(response) {
       console.log('statusChangeCallback');



       // The response object is returned with a status field that lets the
       // app know the current login status of the person.
       // Full docs on the response object can be found in the documentation
       // for FB.getLoginStatus().
       if (response.status === 'connected') {
         // Logged into your app and Facebook.
         accessToken = response.authResponse.accessToken;
         testAPI();
         getIdDesc();


         $("#splashScreen").hide();
         $(".content").show();

       } else if (response.status === 'not_authorized') {
          $("content").hide();
         // The person is logged into Facebook, but not your app.
         document.getElementById('status').innerHTML = 'Please log ' +
           'into this app.';
           $("content").hide();

       } else {
         // The person is not logged into Facebook, so we're not sure if
         // they are logged into this app or not.
         document.getElementById('status').innerHTML = 'Please log ' +
           'into Facebook.';
       }
     }

     // This function is called when someone finishes with the Login
     // Button.  See the onlogin handler attached to it in the sample
     // code below.
     function checkLoginState() {
       FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
       });
     }

     window.fbAsyncInit = function() {
     FB.init({
       appId      : '1039844299401839',
       cookie     : true,  // enable cookies to allow the server to access
                           // the session
       xfbml      : true,  // parse social plugins on this page
       version    : 'v2.2' // use version 2.2
     });

     // Now that we've initialized the JavaScript SDK, we call
     // FB.getLoginStatus().  This function gets the state of the
     // person visiting this page and can return one of three states to
     // the callback you provide.  They can be:
     //
     // 1. Logged into your app ('connected')
     // 2. Logged into Facebook, but not your app ('not_authorized')
     // 3. Not logged into Facebook and can't tell if they are logged into
     //    your app or not.
     //
     // These three cases are handled in the callback function.

     FB.getLoginStatus(function(response) {
       statusChangeCallback(response);
     });

     };

     // Load the SDK asynchronously
     (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     // Here we run a very simple test of the Graph API after login is
     // successful.  See statusChangeCallback() for when this call is made.
     function testAPI() {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Successful login for: ' + response.name);
         document.getElementById('status').innerHTML =
           'Thanks for logging in, ' + response.name + '!';
       });
     }

     function getIdDesc(){
       FB.api(
         '/815157038515764',
         'GET',
         {"fields":"albums{cover_photo,location,likes},description"},
         function(response) {
           descriptionArea.innerHTML=response.description;

           for (var i = 0; i < response.albums.data.length; i++) {
             var description = response.albums.data[i].location;

             if(!description)continue;

              var n = description.indexOf("Australia");

             if (n != -1){
               likes = response.albums.data[i].likes.data;
               numberOfLikes = likes.length;
               url = response.albums.data[i].id;

               getThumbSource(url, description, numberOfLikes);
             }
           }
         }
       );
     }

     function getThumbSource(id, desc, likes){
       var pic;
       FB.api('/'+id, 'GET', {"fields":"cover_photo"},
       function(response) {
         //console.log("This is coverPhoto ID: "+ response.cover_photo.id);
         getCoverSource = response.cover_photo.id;

         FB.api( '/'+getCoverSource, 'GET', {"fields":"source"},
         function (response) {
           //console.log(response.source);
           pic = response.source;
           //console.log("THIS IS PIC:  " +pic);

           albumArea.innerHTML+=
           "<figure id='faceFigure'><img class='facePic' src='"+pic+
           "'><figcaption id='faceDesc'>" + desc + "\n Likes: " + likes +
          "</figcaption></figure>";


         }
       );
     }
   );
 }
