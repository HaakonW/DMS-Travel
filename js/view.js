view.createThumbs= function(id, desc, likes){
  var pic;
  FB.api('/'+id, 'GET', {"fields":"cover_photo, photos"},
  function(response) {
    getCoverSource = response.cover_photo.id;
    FB.api( '/'+getCoverSource, 'GET', {"fields":"source, id, link, album"},
    function (response) {
      pic = response.source;
      albumArea.innerHTML+=
      "<figure class='facebookFigures' id='"+id+"' onclick='view.createPhotoAlbum("+id+")'><img class='thumbPictures' src='"+pic+
      "'><figcaption><p class='albumDesc'>" + desc + "</p><p class='likeClicker'>" + likes +
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
      console.log(response);
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
        generateHTML = "<figure>" + pic +"<figcaption><p class='photoDesc'>"+ desc  +"</p>";
        generateHTML += "<div id='"+picId+"'";
        if (boolean === false){       generateHTML += "onclick='facebook.likeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Like This Picture</div>";  }
        else if(boolean === true){  generateHTML += "onclick='facebook.dislikeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Unlike This Picture</div>"; }
        generateHTML += "</hp></figcaption></figure>";
        albumArea.innerHTML += generateHTML;
        // albumArea.innerHTML += "<figure class='photoAlbum'>" + pic +"<figcaption><h5 class='photoDesc'>" + desc  +"</h5>"+likesCounter+" Likes<h5 onclick='likeThis("+picId+")'>Like this picture</h5><h5 id="+picId+"></h5>"+"<h5>"+boolean+"</h5></figcaption></figure>";
      } // END OUTER FOR
    }
  );
};

view.createReview = function(text){
  document.getElementById('reviewText').innerHTML += "<br>"+ message + "<br>";
};

view.showDoc = function(){
  firstWelcome.innerHTML = "Documentation";
  var html = "<div id='docText'>";
  html += "<p class='smallCaps' id='docFont'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.";
  html += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.</p>";
  html += "<p class='smallCaps' id='docFont'>Lorem ipsum dolor s'it amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.";
  html += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.</p>";
  html += "</div>";
  responseArea.innerHTML = html;

};

view.showAbout = function(){
  firstWelcome.innerHTML = "About";
  var html = "<div id='aboutText'>";
  html+= "<h3 class='smallCaps'>Made by: Haakon Winther - Spring 2015</h3>";
  html+="<h4 class='smallCaps'><a href=''>HaakonWinther@gmail.com</a></h4>";
  html+= "<h3 class='smallCaps'>Student number: s5030763</h3>";
  html+="</div>";
  responseArea.innerHTML = html;
};

view.showSplash = function(){
  firstWelcome.innerHTML = "Welcome To Dms Travel";
  responseArea.innerHTML = "";

};
