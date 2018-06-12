function Ticket (movie, time, age) {
  this.movieName = movie;
  this.time = time;
  this.age = age;
}

function Movie (name, times) {
  this.name = name;
  this.listedTimes = times;

}
Ticket.prototype.priceCalc = function(index) {
  price = 10;
  if (this.age[index] === "child") {
    price *= 0.6;
  } else if (this.age[index] === "senior"){
    price *= 0.8;
  } else {
    price *= 1.2;
  }
  if (parseInt(this.time) < 1400) {
    price *= 0.8;
  }
  return price;
}

function pushNumberOfTickets (array, numAdult, numChild, numSenior) {
  for(i = 0; i < numAdult; i++){
    array.push("adult");
  }
  for(i = 0; i < numChild; i++){
    array.push("child");
  }
  for(i = 0; i < numSenior; i++){
    array.push("senior");
  }
}


function toMilitaryTime (string) {
  var newString = string.split(":").join("");
  if(newString.includes("pm")) {
    if(parseInt(newString) < 1200) {
      return parseInt(newString)+ 1200;
    } else {
      return parseInt(newString);
    }
  } else {
    return parseInt(newString);
  }
}
function toNormalTime (string) {
  var number = parseInt(string);
  if (number >= 1300) {
    number -= 1200
    if (number < 1000) {
      newString = number.toString();
      return newString.slice(0,1) + ":" + newString.slice(1) + "pm";
    } else {
      newString = number.toString();
      return newString.slice(0,2) + ":" + newString.slice(2) + "pm";
    }
  } else {
    if (number < 1000) {
      newString = number.toString();
      return newString.slice(0,1) + ":" + newString.slice(1) + "am";
    } else {
      newString = number.toString();
      return newString.slice(0,2) + ":" + newString.slice(2) + "am";
    }
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
    pushNumberOfTickets(arrayOfAges, inputtedNumAdults, inputtedNumChilds, inputtedNumSeniors);

    var newTicket = new Ticket (movieNames[index], inputtedTime, arrayOfAges);

    var total = 0;

    for(i = 0; i < arrayOfAges.length; i++) {
      total += newTicket.priceCalc(i);
    };

    $("#movie-summary").text(newTicket.movieName);
    $("#time-summary").text(toNormalTime(inputtedTime));
    $("#total").text(total.toFixed(2));
    $(".summary-hidden").show();
  });
});
