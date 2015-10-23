facebook.appID = 815157038515764;
facebook.displayThumbsCallback;

facebook.loadContent = function(){
  facebook.getIdDescforThumbs(controller.displayThumbsCallback);
  // facebook.getComments();
  $("#splashScreen").hide();
  $("#firstWelcome").hide();
  $("#faceLogin").hide();
  $("#navLinks").show();
  document.getElementById('status').innerHTML = "";
};

facebook.getIdDescforThumbs = function(displayThumbsCallback){
  facebook.displayThumbsCallback = displayThumbsCallback;
  FB.api('/'+facebook.appID,'GET', {"fields":"albums{cover_photo,location,likes},description"},
    function(response) {
      descriptionArea.innerHTML=response.description;
      for (var i = 0; i < response.albums.data.length; i++) {
        var description = response.albums.data[i].location;
        if(!description)continue;                          //Iterate to next if no location
        var n = description.indexOf("Australia");
        if (n != -1){                                      //Check for Australia
          likes = response.albums.data[i].likes.data;
          numberOfLikes = parseInt(likes.length);          //Save likes
          url = response.albums.data[i].id;
          description = description.substring(0, description.indexOf(',')); // I only want the name. Looks cleaner.
          view.createThumbs(url, description, numberOfLikes); // call method to create URL, Desc and Likes
        } //End IF
       } //END FOR
    }
  );
};

facebook.getComments = function(){
  FB.api('/'+facebook.appID, 'GET', {"fields":"feed{likes, message}"},
  function(response) {
    for (var i = 0; i < response.feed.data.length; i++) {
      if (typeof response.feed.data[i].message !== "undefined" && typeof response.feed.data[i].likes !== "undefined") {
          var tempArray = response.feed.data[i].likes.data;
          for (var j = 0; j < tempArray.length; j++) {
            if (tempArray[j].id == facebook.appID){
              // console.log(response.feed.data[i].message);
              message = response.feed.data[i].message;
              view.createReview(message);
            }
          } //END SECOND FOR
        }//END CHECK IF
      } //END FIRST IF
    } //END FIRST FOR
);
};

facebook.likeThis = function(pictureId){
  console.log("THIS IS PIC ID: " +pictureId);
  FB.api( '/'+pictureId+'/likes', 'POST', {},
    function(response) {
        if (response.success === true)  document.getElementById(pictureId).innerHTML = "Liked";
        facebook.updateLikes(pictureId);
    }
  );
};

facebook.dislikeThis = function(pictureId){
  FB.api( '/'+pictureId+'/likes', 'DELETE', {},
    function(response) {
      console.log("THIS IS PICID DISLIKE" + pictureId);
        if (response.success === true)  return "Disliked";
        facebook.updateLikes(pictureId);
    }
  );
};

facebook.updateLikes = function(pictureId){
  FB.api('/'+pictureId, 'GET', {"fields":"album"},
  function(response) {
    albumID = response.album.id;
    view.createPhotoAlbum(albumID);
  }
);
};

facebook.didYouLike = function (likeArray)
{
  for (var i = 0; i < likeArray.length; i++) {
    if (userLoggedIn === likeArray[i].id) return true;
  }
  return false;
};
