$(function() {   
  var films = ["Spirited Away", "My Neighbor Totoro", "Kiki's Delivery Service", "Howl's Moving Castle", "Ponyo"];
  var filmImage = "";

  function displayGif() {
      var film = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + film + "&api_key=3DWffnfEL2zjFdPhKRbDF7n4nCd0it1M&limit=10";      
      $(".gifs").detach();      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          results = response.data;
          for (var i = 0; i < results.length; i++) {
              var filmDiv = $("<div class='gifs float-left m-2 mt-5'>");
              var p = $("<p>").text("Rating: " + results[i].rating);
              filmImage = $("<img>");
              filmImage.attr({
                  "src": results[i].images.fixed_height_still.url,
                  "data-state": "still",
                  "class": "gifImage",
                  "data-animate": results[i].images.fixed_height.url,
                  "data-still": results[i].images.fixed_height_still.url
              });
              filmDiv.append(p);
              filmDiv.append(filmImage);              
              $("#gifs").prepend(filmDiv);
            };
          renderButtons();
      });
  };

  function renderButtons() {      
      $("#newButtons").empty();      
      for (var i = 0; i < films.length; i++) {
          var a = $("<button class='btn btn-info film m-1'>");          
          a.attr("data-name", films[i]);        
          a.text(films[i]);          
          $("#newButtons").append(a);
      }
  }

  $("#add-film").on("click", function(event) {
      event.preventDefault();      
      var film = $("#film-input").val().trim();      
      if (films.indexOf(film) === -1){          
          films.push(film);          
          renderButtons();
      };
  });

  $(document).on("click", ".gifImage", function() {      
      var state = $(this).attr("data-state");    
      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
      } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      };
  });

  $(document).on("click", ".film", displayGif);
  renderButtons();
});