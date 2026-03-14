document.addEventListener("DOMContentLoaded", function () {
  const booking = JSON.parse(localStorage.getItem("finalBooking"));

  if (!booking) {
    alert("Không có dữ liệu thanh toán");
    window.location.href = "/html/Payment.html";
    return;
  }

  const poster = booking.poster;

  if (!poster) {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (movieData && movieData.poster) {
      poster = movieData.poster;
    }
  }

  document.getElementById("movieName").textContent = booking.movie;
  document.getElementById("time").textContent =
    booking.date + " - " + booking.time;
  document.getElementById("location").textContent =
    booking.area + " - " + booking.cinema;
  document.getElementById("seats").textContent = booking.seats.join(",");
  document.getElementById("price").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";
  const homeBtn = document.getElementById("homebtn");
  homeBtn.addEventListener("click", function () {
    window.location.href = "/html/trangchu.html";
  });
});
