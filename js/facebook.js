array = [];


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
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
    $("#albumArea").hide();
    $("#navLinks").hide();
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
    console.log(response);
    console.log(response);
    userLoggedIn = response.id;
    console.log(userLoggedIn);
    console.log('Successful login for: ' + response.name + userLoggedIn);
    document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name +'!';
  });
}

function getIdDesc(){
  FB.api('/815157038515764','GET', {"fields":"albums{cover_photo,location,likes},description"},
    function(response) {
      descriptionArea.innerHTML=response.description;
      for (var i = 0; i < response.albums.data.length; i++) {
        var description = response.albums.data[i].location;
        if(!description)continue;                                 //Iterate to next if no location
        var n = description.indexOf("Australia");
        if (n != -1){                                             //Check for Australia
          likes = response.albums.data[i].likes.data;
          numberOfLikes = likes.length;                           //Save likes
          url = response.albums.data[i].id;
          // console.log("DETTE ER URL: " + url);
          getThumbSource(url, description, numberOfLikes);        // call method to create URL, Desc and Likes
        } //End IF
       } //END FOR
    }
  );
    // albumListener(array);                                         //Send to albumListener which albumID are active
}

function getThumbSource(id, desc, likes){                           /*GET AUSTRALIA*/
  var pic;
  FB.api('/'+id, 'GET', {"fields":"cover_photo, photos"},
  function(response) {
    getCoverSource = response.cover_photo.id;
    console.log(getCoverSource);                      /*Getting photos + id to coverPhoto*/
    FB.api( '/'+getCoverSource, 'GET', {"fields":"source, id, link, album"},
      function (response) {
          albumId = response.album.id;
          array.push(albumId);
          // console.log(array)FUNKER;
          // albumListener(array);
          pic = response.source;
          albumArea.innerHTML+=
          "<figure class='faceFigure' id='"+id+"'><img class='facePic' src='"+pic+
          "'><figcaption id=''>" + desc + "\n Likes: " + likes +
          "</figcaption></figure>";
    }
  );
}
);
}

function createAlbum(albumId){
  albumArea.innerHTML="";
  FB.api(
  '/' + albumId,'GET', {"fields":"photos{images, name, likes}"},
  function(response) {
    for (var i = 0; i < response.photos.data.length; i++) {
       temp = response.photos.data[i].images;
       bigPic = temp[0].source;
       desc = response.photos.data[i].name;
       if (typeof response.photos.data[i].likes === "undefined"  ) {likesCounter = 0;  }
       else {likesCounter = response.photos.data[i].likes.data.length; }
       if (!desc) desc = "No title ";
       for (var j = 0; j < temp.length; j++) {
         if (temp[j].height === 320) thumbSource = temp[j].source;
        //  console.log(response.photos.data[i].likes);
        //  console.log(response.photos.data[i].likes.data);
        //  console.log(response.photos.data[i].likes.data[j].id);
        //  tempID = response.photos.data[i].likes.data[j];
        //  console.log(tempID);
         //
        //  if(typeof response.photos.data[i].likes.data[j].id === "undefined") {tempID = 0;}
        //  else {  tempID = response.photos.data[i].likes.data[j].id;}

        //  console.log(tempID);
          // if(userLoggedIn === )
        //  if (typeof response.photos.data[i].likes.data[j].id === "undefined"  ) {nameList = 0;  }
        //  else {nameList = response.photos.data[i].likes.data[j].id; }
         //
        //   //  nameList = response.photos.data[i].likes.data[j].id;
         //
        //     console.log(nameList);
        //  if (tempID === userLoggedIn) { console.log(userLoggedIn);  }
       } // END FOR
       var pic = "<a href='"+bigPic+"'data-lightbox='myPhoto'" + "data-title='"+desc+"'>";
       pic += "<img class='photoAlbum' src='" + thumbSource + "'></a>";
       albumArea.innerHTML += "<figure>" + pic +"<figcaption>" + desc  +"| Likes: "+likesCounter+"</figcaption></figure>";
    } // END OUTER FOR

  }
);
}

$(document).on('click', '#816520808379387', function() {
  console.log("BNE");
  temp=816520808379387;
  createAlbum(temp);
});

$(document).on('click', '#816504545047680', function()
{ console.log("GC");
temp=816504545047680;
createAlbum(temp);
});

$(document).on('click', '#816503235047811', function() {
   console.log("Noosa");
   temp=816503235047811;
   createAlbum(temp);
 });

$(document).on('click', '#816508098380658', function() {
   console.log("Heron");
   temp=816508098380658;
   createAlbum(temp);
 });
