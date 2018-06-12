function Ticket (movie, time, age) {
  this.movieName = movie;
  this.time = time;
  this.age = age;
}

function Movie (name, times) {
  this.name = name;
  this.listedTimes = times;

}
Ticket.prototype.priceCalc = function() {
  var price = 10;
  if (this.age === "child") {
    price *= 0.6;
  } else if (this.age === "senior"){
    price *= 0.8;
  } else {
    price *= 1.2;
  }
  if (this.time < 1400) {
    price *= 0.8;
  }
}

function pushNumberOfTickets (array, index, numAdult, numChild, numSenior) {
  for(i = 0; i < numAdult; i++){
    array.push("adult");
    index++;
  }
  for(i = 0; i < numChild; i++){
    array.push("child");
    index++;
  }
  for(i = 0; i < numSenior; i++){
    array.push("senior");
    index++;
  }
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
    var index = parseInt($("select#movie-name").val());
    var inputtedTime = parseInt($("input:radio[name=time-of-movie]:checked").val());
    var inputtedNumAdults = parseInt($("input#adult").val());
    var inputtedNumChilds = parseInt($("input#child").val());
    var inputtedNumSeniors = parseInt($("input#senior").val());

    var arrayOfAges = [];
    var agesIndex = 0;
    pushNumberOfTickets(arrayOfAges, agesIndex, inputtedNumAdults, inputtedNumChilds, inputtedNumSeniors);
    var newTicket = new Ticket (movieNames[index], inputtedTime, arrayOfAges[agesIndex]);

    
  });
});
