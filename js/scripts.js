function Ticket (movie, time, age) {
  this.movieName = movie;
  this.time = time;
  this.age = age;
}

function Movie (name, times) {
  this.name = name;
  this.listedTimes = times;

}

var adriftTimes = ["11:10am", "1:45pm", "4:20pm", "7:10pm", "9:45pm"];
var avengersTimes = ["12:15pm", "3:45pm", "6:00pm", "9:25pm"]
var bookClubTimes = ["12:45pm", "3:35pm", "6:20pm", "9:00pm"]
var firstReformedTimes = ["12:10pm", "3:00pm", "7:15pm", "9:35pm"]
var rBGTimes = ["11:30am", "2:00pm", "4:30pm", "7:05pm"]
var movieTimes = [adriftTimes, avengersTimes, bookClubTimes, firstReformedTimes, rBGTimes];
var movieNames = ["Adrift", "Avengers:Infinity War","Book Club", "First Reformed", "RBG"]

$(document).ready(function(){
  $("button.show-time-button").click(function(){
    $("#show-times").empty();
    var index = parseInt($("select#movie-name").val());
    var newMovie = new Movie (movieNames[index], movieTimes[index]);
    if (!isNaN(index)) {
      $(".movie-title").text("Show Times for " + newMovie.name);


      newMovie.listedTimes.forEach(function(time){
      $("#show-times").append('<div class="radio">' +
                                  '<label>' +
                                    '<input type="radio" name="flavor" value="' + time + '" checked>' +
                                    time +
                                  '</label>' +
                                '</div>');
      });
    } else {
      $(".movie-title").empty();
    }
  });
  $("form#buy-tickets").submit(function(event){
    event.preventDefault();
  });
});
