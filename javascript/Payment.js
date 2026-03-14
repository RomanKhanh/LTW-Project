document.addEventListener("DOMContentLoaded", function () {
  const booking = JSON.parse(localStorage.getItem("pendingBooking"));

  if (!booking) {
    alert("Không có dữ liệu đặt vé");
    window.location.href = "/html/showtime.html";
    return;
  }

  // ===== POSTER =====
  let poster = booking.poster;

  if (!poster) {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (movieData && movieData.poster) {
      poster = movieData.poster;
    }
  }

  if (poster) {
    document.getElementById("moviePoster").src = poster;
  }

  // ===== TÊN PHIM =====
  document.getElementById("movieName").textContent = booking.movie;

  // ===== THỜI GIAN =====
  document.getElementById("movieTime").textContent =
    booking.date + " - " + booking.time;

  // ===== ĐỊA ĐIỂM + GHẾ =====
  document.getElementById("movieSeats").textContent =
    booking.area +
    " - " +
    booking.cinema +
    " | Ghế: " +
    booking.seats.join(", ");

  // ===== TÍNH TIỀN =====
  const ticketPrice = booking.totalPrice;

  document.getElementById("ticketPrice").textContent =
    ticketPrice.toLocaleString("vi-VN") + "đ";

  document.getElementById("totalPrice").textContent =
    ticketPrice.toLocaleString("vi-VN") + "đ";

  // ===== FORM THANH TOÁN =====
  const form = document.querySelector(".payment-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const bank = document.getElementById("bank-select").value;
    const cardNumber = document.getElementById("card-number").value;
    const email = document.getElementById("email").value;
    const discountCode = document.getElementById("discount-code").value;

    const paymentInfo = {
      ...booking,
      bank,
      cardNumber,
      email,
      discountCode,
    };

    localStorage.setItem("finalBooking", JSON.stringify(paymentInfo));

    window.location.href = "/html/confirmation.html";
  });
});
