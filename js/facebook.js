facebook.appID = 815157038515764; //ADMIN & APPID for DMS travel.
facebook.displayThumbsCallback;

//Method to get the user logged in ID
//The method that starts the the rendering of the HTML
facebook.loadContent = function(user){
  facebook.getIdDescforThumbs(controller.displayThumbsCallback);
  userLoggedIn = user;
};

//Method that get the neccerary data to start creating the thumbnail on the home page
//Checks for location equal to Australia and likes
facebook.getIdDescforThumbs = function(displayThumbsCallback){
  facebook.displayThumbsCallback = displayThumbsCallback;
  FB.api('/'+facebook.appID,'GET', {"fields":"albums{cover_photo,location,likes.limit(50)},description"},
    function(response) {
      descriptionArea.innerHTML=response.description;                       //puts the description in the footer
      albumArea.innerHTML= "";
      for (var i = 0; i < response.albums.data.length; i++) {
        var description = response.albums.data[i].location;
        if(!description)continue;                                           //Iterate to next if there is no location
        var n = description.indexOf("Australia");
        if (n != -1){                                                       //Check for Australia
          likes = response.albums.data[i].likes.data;
          numberOfLikes = parseInt(likes.length);                           //Save likes for the album
          url = response.albums.data[i].id;
          description = description.substring(0, description.indexOf(',')); // I only want the name. I think it Looks cleaner.
          facebook.createThumbs(url, description, numberOfLikes);           // call method to create URL, Desc and Likes
        } //End IF
       } //END FOR
    }
  );
};

//Method that recives id, desc and likes from getIdDescforThumbs
//Gets the ID for each of the albums, and then is availiable to fetch teh source of the picture
facebook.createThumbs = function(id, desc, likes){
  FB.api('/'+id, 'GET', {"fields":"cover_photo, photos"},
  function(response) {
    getCoverSource = response.cover_photo.id;
    console.log("coverSource: "+getCoverSource);
    FB.api( '/'+getCoverSource, 'GET', {"fields":"source, id, link, album"},
    function (response) {
      var pic = response.source;
      console.log("PIC: "+pic);
      view.createThumbs(id, desc, likes, pic); //?
    }
  );
}
);
};


//Method that gets the comments from the site where DMS travel liked the post
facebook.getComments = function(){
  FB.api('/'+facebook.appID, 'GET', {"fields":"feed{likes, message}"},
  function(response) {
    for (var i = 0; i < response.feed.data.length; i++) {
      //IF commment is not undefined or the number of likes is not undefined
      if (typeof response.feed.data[i].message !== "undefined" && typeof response.feed.data[i].likes !== "undefined") {
          var tempArray = response.feed.data[i].likes.data;     //Array for the likes on that comment
          for (var j = 0; j < tempArray.length; j++) {
            if (tempArray[j].id == facebook.appID){             //Check if the like is equal to the like.id = ADMIN
              message = response.feed.data[i].message;
              view.createReview(message); 
            }
          } //END SECOND FOR
        }//END CHECK IF
      } //END FIRST IF
    } //END FIRST FOR
);
};

//A method that lets the user like a photo in an album
facebook.likeThis = function(pictureId){
  FB.api( '/'+pictureId+'/likes', 'POST', {},
    function(response) {
        if (response.success === true)  facebook.getNewLikesCount(pictureId);
    }
  );
};
//A method that lets the user unlike a photo in an album
facebook.dislikeThis = function(pictureId){
  FB.api( '/'+pictureId+'/likes', 'DELETE', {},
    function(response) {
      if (response.success === true) facebook.getNewLikesCount(pictureId);
    }
  );
};

//The method that is beeing called after liking or dislink a picture. To update the likeCount
facebook.getNewLikesCount = function(pictureId){
  FB.api('/'+pictureId, 'GET', {"fields":"album"},
  function(response) {
    albumID = response.album.id;
    facebook.fetchPhotoData(albumID); //?
  }
);
};

//The method that creates the photos fetched from Facebook.
//Also creates both likes and the description for the picture.
facebook.fetchPhotoData = function (albumId){
  albumArea.innerHTML="";           //Clears the HTML incase there is something there from earilier
  FB.api(
    '/' + albumId,'GET', {"fields":"name, photos{images, name, likes.limit(50)}"},
    function(response) {
      view.firstWelcome(response.name);                                                 //
      for (var i = 0; i < response.photos.data.length; i++) {
        var temp = response.photos.data[i].images;
        bigPic = temp[0].source;                                                       //The big picture to display in lightbox, always number one in the array
        desc = response.photos.data[i].name;
        if (!desc) desc = "No Title";                                                 // No tilte? Then title is "No Title"
        if (typeof response.photos.data[i].likes === "undefined")  likesCounter = 0; //Check for likes, undefined likes = 0 likes
        else {
          likesCounter = response.photos.data[i].likes.data.length;                  //save the number of likes
          boolean = facebook.didYouLike(response.photos.data[i].likes.data);         //check if user liked the picture or not
        }
        for (var j = 0; j < temp.length; j++) {
          if (temp[j].height === 320) thumbSource = temp[j].source;                 //Get the pic with height 320 as thumb
        } // END INNER FOR
        var picId = response.photos.data[i].id;
        view.createPhotoAlbum(desc, picId, thumbSource, boolean);                   //  call the view to start rendering HTML
      } // END OUTER FOR
    });
};

//A method that checks if you previously liked a photo or not. To help what to display in the view
facebook.didYouLike = function (likeArray)
{
  for (var i = 0; i < likeArray.length; i++)  if (userLoggedIn === likeArray[i].id) return true;
  return false;
};
