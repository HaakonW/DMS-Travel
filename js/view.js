


view.createThumbs= function(id, desc, likes){                           /*GET AUSTRALIA*/
  var pic;
  FB.api('/'+id, 'GET', {"fields":"cover_photo, photos"},
  function(response) {
    getCoverSource = response.cover_photo.id;
    FB.api( '/'+getCoverSource, 'GET', {"fields":"source, id, link, album"},
    function (response) {
      pic = response.source;
      albumArea.innerHTML+=
      "<figure class='facebookFigures' id='"+id+"' onclick='view.createPhotoAlbum("+id+")'><img class='thumbPictures' src='"+pic+
      "'><figcaption><p class='albumDesc'>" + desc + "</p><p class='likeAlbum'>" + likes +
      " People like this album</p></figcaption></figure>";
    }
  );
}
);
};

view.createPhotoAlbum = function (albumId){
  albumArea.innerHTML="";
  FB.api(
    '/' + albumId,'GET', {"fields":"photos{images, name, likes}"},
    function(response) {
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
        var pic = "<a href='"+bigPic+"'data-lightbox='myPhoto'" + "data-title='"+desc+"'>";
        pic += "<img class='albumPictures' src='" + thumbSource + "'></a>";
        generateHTML = "<figure>" + pic +"<figcaption><h4 class='photoDesc'>"+ desc  +"</h4>";
        generateHTML += "<div id='"+picId+"'";
        if (!boolean){     generateHTML += "onclick='facebook.likeThis("+picId+")'><h4 class='likeClicker'>"+likesCounter +" Likes - Like This Picture</div>";  }
        else if(boolean){  generateHTML += "onclick='facebook.dislikeThis("+picId+")'><h4 class='likeClicker'>"+likesCounter +" Likes - Unlike This Picture</div>"; }
        generateHTML += "</h4></figcaption></figure>";
        albumArea.innerHTML += generateHTML;
        // albumArea.innerHTML += "<figure class='photoAlbum'>" + pic +"<figcaption><h5 class='photoDesc'>" + desc  +"</h5>"+likesCounter+" Likes<h5 onclick='likeThis("+picId+")'>Like this picture</h5><h5 id="+picId+"></h5>"+"<h5>"+boolean+"</h5></figcaption></figure>";
      } // END OUTER FOR
    }
  );
};

view.createReview = function(text){
  document.getElementById('reviewText').innerHTML += "<br>"+ message + "<br>";
};