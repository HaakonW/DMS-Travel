//A method that is beeing called when the home page loads.
//Creates navbar at hides necessary elements from the splashScreen

view.fadeHTML = function(){
  $("#splashScreen").hide();
  $("#faceLogin").hide();
  $("#homeBTN").fadeIn(400);
    $("#feedback").fadeIn(1200);
      $("#docBTN").fadeIn(2200);
        $("#aboutBTN").fadeIn(3000);
          $("#logout").fadeIn(4200);
            // $("#footer").delay(3500).fadeIn(1200);
              $("nav").css("margin-top", "-10px");
};

// A method that creates the thubnails the user se on the first page.
//Gets its parameter from facebook.createThumbs
view.createThumbs= function(id, desc, likes, pic, footerData){
  view.fadeHTML();
  view.firstWelcome("top");
      albumArea.innerHTML+=
      "<figure class='facebookFigures' id='"+id+"' onclick='facebook.fetchPhotoData("+id+")'><img class='thumbPictures' src='"+pic+
      "'><figcaption><p class='albumDesc'>" + desc + "</p><p class='likeClicker'>" + likes +
      " People like this album</p></figcaption></figure>";
      $("#albumArea").fadeIn(600);
      $("#responseArea").fadeOut(500);
      $("#reviewArea").hide();
      $("#descriptionArea").html(footerData);
};

//A method that changes the heading of the page.
//From Home to feedback for example.
view.firstWelcome = function(string){
  $("#firstWelcome").html(string).fadeIn(1500);
  if(string=== "top") $("#firstWelcome").fadeIn(1500).html("Check out these top Australian destinations!");
  if(string=== "feedback") $("#firstWelcome").fadeIn(1500).html("Feedback from our Customers");
  // if(string=="first"){
  //   firstWelcome.innerHTML = "Welcome To Dms Travel";
  //   responseArea.innerHTML = "";
  // }
};

//Creates the HTML for the photos in a spesific album
//Gets the description, pictureID, a source for the thubnail Picture and a boolean if the picture got likes or not.
//Then starts to generate the HTML to create the photos from the clicked Album.
view.createPhotoAlbum = function (desc, picId, thumbSource, boolean){
        var pic = "<a href='"+bigPic+"'data-lightbox='myPhoto'" + "data-title='"+desc+"'>";
        pic += "<img class='albumPictures' src='" + thumbSource + "'></a>";
        generateHTML = "<figure>" + pic +"<figcaption><p class='photoDesc'>"+ desc  +"</p>";
        generateHTML += "<div id='"+picId+"'";
        if (boolean === false){     generateHTML += "onclick='facebook.likeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Like This Picture</div>";  }
        else if(boolean === true){  generateHTML += "onclick='facebook.dislikeThis("+picId+")'><p class='likeClicker'>"+likesCounter +" Likes - Unlike This Picture</div>"; }
        generateHTML += "</p></figcaption></figure>";
        albumArea.innerHTML += generateHTML;
    };

//Displays the comments from the facebook site where where the Admin liked the post.
//Hides all irrelevant content
view.createReview = function(message){
  view.firstWelcome("feedback");
  $("#albumArea").hide();
  $("#docFont").hide();
  $("#responseArea").hide();
  $("#reviewArea").show();
  var html ="<br>"+ message + "<br>";
  $("#reviewText").append(html);
};

//Method that displays the documentation for this project.
//Hides all irrelevant content
view.showDoc = function(){
  view.firstWelcome("Documentation");
  $("#albumArea").fadeOut(300);
  $("#reviewArea").fadeOut(300);
  $("#responseArea").fadeIn(700);
  $("#footer").hide();

  var html = "<div id='docText'>";
  html += "<p class='smallCaps' id='docFont'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.";
  html += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.</p>";
  html += "<p class='smallCaps' id='docFont'>Lorem ipsum dolor s'it amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.";
  html += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita at, voluptate officiis, rem, quisquam perferendis quas ipsam illum mollitia odio deleniti, et earum delectus sint voluptates sequi fugit amet soluta.</p>";
  html += "</div>";
  responseArea.innerHTML = html;
};

//Method that displays about page for this project.
//Hides all irrelevant content
view.showAbout = function(){
  $("#footer").hide();
  $("#reviewArea").fadeOut(300);
  $("#albumArea").fadeOut(300);
  $("#responseArea").fadeIn(700);
  view.firstWelcome("About");
  var html = "<div id='aboutText'>";
  html+= "<h3 class='smallCaps'>Made by: Haakon Winther - Spring 2015</h3>";
  html+="<h4 class='smallCaps'><a href=''>HaakonWinther@gmail.com</a></h4>";
  html+= "<h3 class='smallCaps'>Student number: s5030763</h3>";
  html+="</div>";
  responseArea.innerHTML = html;
};
