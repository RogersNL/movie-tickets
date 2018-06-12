function Ticket (movie, time, age) {
  this.movieName = movie;
  this.time = time;
  this.age = age;
}

function Movie (name, times) {
  this.name = name;
  this.listedTimes = times;

}
function toMilitaryTime (string) {
  var newString = string.split(":").join("");
  if(newString.includes("am")){
    return parseInt(newString);
  } else {
    return parseInt(newString) + 1200;
  }
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
                                    '<input type="radio" name="time-of-movie" value="' + toMilitaryTime(time) + '" checked>' +
                                    time +
                                  '</label>' +
                                '</div>');
      });
      $(".initial-hidden").show();
    } else {
      $(".movie-title").empty();
      $(".initial-hidden").hide();
    }
  });
  $("form#buy-tickets").submit(function(event){
    event.preventDefault();
    
  });
});
