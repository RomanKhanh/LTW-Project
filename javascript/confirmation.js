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

  document.getElementById("moviePoster").src = poster;
  document.getElementById("movieName").textContent = booking.movie;
  document.getElementById("movieTime").textContent =
    booking.date + " - " + booking.time;
  document.getElementById("movieSeats").textContent =
    booking.area +
    " - " +
    booking.cinema +
    " | Ghế: " +
    booking.seats.join(", ");

  document.getElementById("ticketPrice").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";

  document.getElementById("totalPrice").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";

  document.getElementById("confirmBank").textContent = booking.bank;
  document.getElementById("confirmCardNum").textContent = booking.cardNumber;
  document.getElementById("confirmEmail").textContent = booking.email;

  const gobackBtn = document.getElementById("btnback");
  gobackBtn.addEventListener("click", function () {
    window.location.href = "/html/Payment.html";
  });

  const confirmBtn = document.getElementById("btnsub");
  confirmBtn.addEventListener("click", function () {
    alert("Thanh toán thành công!");
    window.location.href = "/html/alertsuccess.html";
  });
});
