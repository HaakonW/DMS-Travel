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
      $("#footer").show();
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
  $("#footer").hide();
  $("#reviewArea").show();
  var html ="<br>"+ message + "<br>";
  $("#reviewText").append(html);
  // $("#footer").display();

};

//Method that displays the documentation for this project.
//Hides all irrelevant content
view.showDoc = function(){
  view.firstWelcome("Documentation");
  $("#albumArea").fadeOut(300);
  $("#reviewArea").fadeOut(300);
  $("#responseArea").fadeIn(1700);
  $("#footer").hide();

  var html = "<div id='docText'>";
  html+="<h3 class='smallCaps'> Repetition</h3><p class='smallCaps' id='documentationText' id='documentationText'> I choose to focus on repetition on this web page. On every single page the font is equal. I made a class in my css which is named ´smallCaps’. This class makes the font all capital letters, but the actual capital letter is a bit bigger then the others. The font is used in the navigation bar, the pictures, footer and even here in the documentation. Also I chose to have the navigation bar on visible in the top on every single page. All the change in content is also in the same area. This is to make it easy for a user to navigate. The colour scheme for the page is consistent black, blue and white. I tried to not interfere with these colours throughout the site. </p>";
  html+="<h3 class='smallCaps'> White space</h3><p class='smallCaps' id='documentationText'> In this assignment I tried to focus on creating white space. I want the user to feel that not to much content is squashed into one place. I feel the web site is easier to navigate and it looks more professional. I feel my site is balanced and it is possible to get a quick overview over the content without being distracted by other components. </p> ";
  html+="<h3 class='smallCaps'> Proximity</h3><p class='smallCaps' id='documentationText'> In this assignment I used the box-shadow attribute a bit. On my ‘smallCaps’ class I got a shadow on the letter and the in the white figures that surround the different thumbnail pictures I have added some shadow. This makes the object stick out from the rest of the page and hopefully catch the attention of the person viewing the site </p>";
  html += "</div>";
  responseArea.innerHTML = html;



};

//Method that displays about page for this project.
//Hides all irrelevant content
view.showAbout = function(){
  $("#footer").hide();
  $("#reviewArea").fadeOut(300);
  $("#albumArea").fadeOut(300);
  $("#responseArea").fadeIn(1700);
  view.firstWelcome("About");

  var html = "<div id='aboutText'>";
  html+= "<h3 class='smallCaps'>Made by: Haakon Winther - Spring 2015</h3>";
  html+="<h4 class='smallCaps'><a href=''>HaakonWinther@gmail.com</a></h4>";
  html+= "<h3 class='smallCaps'>Student number: s5030763</h3>";
  html+= "<p class='smallCaps'>A project in Dynamic Multimedia Systems 3622 ICT. Creating a dynamic web application to show off a <a target='_blank' href='https://www.facebook.com/DMS-Travel-815157038515764/'>travel agency </a> special ";
  html+= "Australia promotion. Made possible with the Facebook Graph 2.0 API.</p>";
  html+="</div>";
  responseArea.innerHTML = html;
};
