appID = 815157038515764;
adminID = 815157038515764;

function loadContent(){
  getIdDescforThumbs();
  getComments();
  $("#splashScreen").hide();
  $("#navLinks").show();
  document.getElementById('status').innerHTML = "";
}

window.fbAsyncInit = function() { FB.init({ appId: '1039844299401839', xfbml: true, version: 'v2.5'  });};

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

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    accessToken = response.authResponse.accessToken;
    testAPI();
    loadContent();

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +  'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook to get access to DMS Travel.';
    // $("#albumArea").hide();
    // $("#navLinks").hide();
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
  // FB.getStatus().  This function gets the state of the
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
  FB.api('/me', function(response) {
    userLoggedIn = response.id;
    console.log(userLoggedIn);
    console.log('Successful login for: ' + response.name + userLoggedIn);
    // document.getElementById('faceLogin').innerHTML = '<p id="userStatus">Logged in as: ' + response.name + "</p>";
  });
}

function getIdDescforThumbs(){
  FB.api('/'+appID,'GET', {"fields":"albums{cover_photo,location,likes},description"},
    function(response) {
      footerText.innerHTML=response.description;
      for (var i = 0; i < response.albums.data.length; i++) {
        var description = response.albums.data[i].location;
        if(!description)continue;                          //Iterate to next if no location
        var n = description.indexOf("Australia");
        if (n != -1){                                      //Check for Australia
          likes = response.albums.data[i].likes.data;
          numberOfLikes = parseInt(likes.length);          //Save likes
          url = response.albums.data[i].id;
          // console.log(url);
          createThumbs(url, description, numberOfLikes); // call method to create URL, Desc and Likes
        } //End IF
       } //END FOR
    }
  );
}

function createThumbs(id, desc, likes){                           /*GET AUSTRALIA*/
  var pic;
  FB.api('/'+id, 'GET', {"fields":"cover_photo, photos"},
  function(response) {
    getCoverSource = response.cover_photo.id;
    FB.api( '/'+getCoverSource, 'GET', {"fields":"source, id, link, album"},
      function (response) {
          // albumId = response.album.id;
          pic = response.source;
          albumArea.innerHTML+=
          "<figure class='facebookFigures' id='"+id+"'><img class='thumbPictures' src='"+pic+
          "'><figcaption id=''><h4 id='albumDesc'>" + desc + "</h5>" + likes +
          " Likes</figcaption></figure>";
          // thumbNails = {  source:pic, description:desc, numberOfLikes:likes  };
          // generateHTML(thumbNails);

    }
  );
}
);
}


function createPhotoAlbum(albumId){
  albumArea.innerHTML="";
  FB.api(
    '/' + albumId,'GET', {"fields":"photos{images, name, likes}"},
    function(response) {
      for (var i = 0; i < response.photos.data.length; i++) {
        var temp = response.photos.data[i].images;
        bigPic = temp[0].source;
        desc = response.photos.data[i].name;
        if (!desc) desc = "";

        if (typeof response.photos.data[i].likes === "undefined")  likesCounter = 0;
        else {
          likesCounter = response.photos.data[i].likes.data.length;
          boolean = didYouLike(response.photos.data[i].likes.data);
        }

        for (var j = 0; j < temp.length; j++) {
          if (temp[j].height === 320) thumbSource = temp[j].source;
        } // END INNER FOR
        var picId = response.photos.data[i].id;
        var pic = "<a href='"+bigPic+"'data-lightbox='myPhoto'" + "data-title='"+desc+"'>";
        pic += "<img class='albumPictures' src='" + thumbSource + "'></a>";
        tempDick = "<figure class='photoAlbum'>" + pic +"<figcaption><h3 class='photoDesc'>"+ desc  +"</h3><h3>"+likesCounter +" Likes</h3>";

        if (boolean !== "")   tempDick += "<h4 onclick='likeThis("+picId+")'>Like this picture</h4>";
        else tempDick += "<h4 onclick='dislikeThis("+picId+")'>Unlike</h4>";
         tempDick += /*"<h4 id="+picId+">"+boolean+"</h4>*/"</figcaption></figure>";
        albumArea.innerHTML += tempDick;
        // albumArea.innerHTML += "<figure class='photoAlbum'>" + pic +"<figcaption><h5 class='photoDesc'>" + desc  +"</h5>"+likesCounter+" Likes<h5 onclick='likeThis("+picId+")'>Like this picture</h5><h5 id="+picId+"></h5>"+"<h5>"+boolean+"</h5></figcaption></figure>";
      } // END OUTER FOR

    }
  );
}

$(document).on('click', '#816520808379387', function() { temp=816520808379387; createPhotoAlbum(temp);});
$(document).on('click', '#816504545047680', function() { temp=816504545047680; createPhotoAlbum(temp);});
$(document).on('click', '#816503235047811', function() { temp=816503235047811; createPhotoAlbum(temp);});
$(document).on('click', '#816508098380658', function() { temp=816508098380658; createPhotoAlbum(temp);});


function getComments(){
  FB.api('/'+appID, 'GET', {"fields":"feed{likes, message}"},
  function(response) {
    for (var i = 0; i < response.feed.data.length; i++) {
      if (typeof response.feed.data[i].message !== "undefined" && typeof response.feed.data[i].likes !== "undefined") {
          var tempArray = response.feed.data[i].likes.data;
          for (var j = 0; j < tempArray.length; j++) {
            if (tempArray[j].id == adminID){
              console.log(response.feed.data[i].message);
              message = response.feed.data[i].message;
              createReview(message);
            }
          } //END SECOND FOR
        }//END CHECK IF
      } //END FIRST IF
    } //END FIRST FOR
);
}

function createReview(text){
  document.getElementById('reviewText').innerHTML += "<br>"+ message + "<br>";
}

function likeThis(pictureId){
  console.log("THIS IS PIC ID: " +pictureId);
  FB.api( '/'+pictureId+'/likes', 'POST', {},
    function(response) {
        if (response.success === true)  document.getElementById(pictureId).innerHTML = "Liked";

    }
  );
}

function dislikeThis(pictureId){
  FB.api( '/'+pictureId+'/likes', 'DELETE', {},
    function(response) {
        if (response.success === true)  return "Disliked";

    }
  );

}

function didYouLike(likeArray)
{
  // console.log(likeArray);
  for (var i = 0; i < likeArray.length; i++) {
    if (userLoggedIn === likeArray[i].id) return "";
  }
  return false;

}
