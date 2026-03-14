document.addEventListener("DOMContentLoaded", function(){

const buttons = document.querySelectorAll(".btn-booking");

buttons.forEach(function(button){

button.addEventListener("click", function(){

const card = this.closest(".movie-card");

const movieName = card.querySelector("h3").innerText;
const moviePoster = card.querySelector("img").getAttribute("src");

const movie = {
name: movieName,
poster: moviePoster
};

localStorage.setItem("selectedMovie", JSON.stringify(movie));

window.location.href = "showtime.html";

});

});

});