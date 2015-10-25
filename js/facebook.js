facebook.appID = 815157038515764;
facebook.displayThumbsCallback;

facebook.loadContent = function(user){
  facebook.getIdDescforThumbs(controller.displayThumbsCallback);
  userLoggedIn = user;
  document.getElementById('status').innerHTML = "";
};

facebook.getIdDescforThumbs = function(displayThumbsCallback){
  facebook.displayThumbsCallback = displayThumbsCallback;
  FB.api('/'+facebook.appID,'GET', {"fields":"albums{cover_photo,location,likes.limit(50)},description"},
    function(response) {
      descriptionArea.innerHTML=response.description;
      albumArea.innerHTML= "";
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
  FB.api( '/'+pictureId+'/likes', 'POST', {},
    function(response) {
        if (response.success === true)  facebook.updateLikes(pictureId);
    }
  );
};

facebook.dislikeThis = function(pictureId){
  FB.api( '/'+pictureId+'/likes', 'DELETE', {},
    function(response) {
        if (response.success === true) facebook.updateLikes(pictureId);
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
    // console.log(likeArray[i].id);
    if (userLoggedIn === likeArray[i].id) return true;
  }
  return false;
};


//The method that creates the photos fetched from Facebook.
//Also creates both likes and the description for the picture.
facebook.fetchPhotoData = function (albumId){
  albumArea.innerHTML="";           //Clears the HTML incase there is something there from earilier
  FB.api(
    '/' + albumId,'GET', {"fields":"name, photos{images, name, likes.limit(50)}"},
    function(response) {
      // $( "#firstWelcome" ).fadeOut(500);
      view.firstWelcome(response.name);       //VIA CONTROLLER?
      for (var i = 0; i < response.photos.data.length; i++) {
        var temp = response.photos.data[i].images;
        bigPic = temp[0].source;
        desc = response.photos.data[i].name;
        if (!desc) desc = "No Title";
        if (typeof response.photos.data[i].likes === "undefined")  likesCounter = 0;
        else {
          likesCounter = response.photos.data[i].likes.data.length;
          boolean = facebook.didYouLike(response.photos.data[i].likes.data);
        }
        for (var j = 0; j < temp.length; j++) {
          if (temp[j].height === 320) thumbSource = temp[j].source;
        } // END INNER FOR
        var picId = response.photos.data[i].id;
        view.createPhotoAlbum(desc, picId, thumbSource, boolean);

        // var pic = "<a href='"+bigPic+"'data-lightbox='myPhoto'" + "data-title='"+desc+"'>";
        // pic += "<img class='albumPictures' src='" + thumbSource + "'></a>";
        // generateHTML = "<figure>" + pic +"<figcaption><p class='photoDesc'>"+ desc  +"</p>";
        // generateHTML += "<div id='"+picId+"'";
        // if (boolean === false){     generateHTML += "onclick='facebook.likeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Like This Picture</div>";  }
        // else if(boolean === true){  generateHTML += "onclick='facebook.dislikeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Unlike This Picture</div>"; }
        // generateHTML += "</p></figcaption></figure>";
        // albumArea.innerHTML += generateHTML;
      } // END OUTER FOR
    });
};
