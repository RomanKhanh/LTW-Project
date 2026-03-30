// Đợi HTML load xong mới chạy JS (tránh lỗi chưa load DOM)
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu đặt vé tạm từ localStorage
  const booking = JSON.parse(localStorage.getItem("pendingBooking"));

  // Nếu không có dữ liệu → quay lại trang chọn suất chiếu
  if (!booking) {
    alert("Không có dữ liệu đặt vé");
    window.location.href = "/html/showtime.html";
    return; // dừng code
  }

  // ===== XỬ LÝ POSTER PHIM =====
  let poster = booking.poster;

  // Nếu booking chưa có poster → lấy từ selectedMovie
  if (!poster) {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (movieData && movieData.poster) {
      poster = movieData.poster;
    }
  }

  // Nếu có poster thì hiển thị lên UI
  if (poster) {
    document.getElementById("moviePoster").src = poster;
  }

  // ===== HIỂN THỊ THÔNG TIN PHIM =====

  // Tên phim
  document.getElementById("movieName").textContent = booking.movie;

  // Ngày + giờ chiếu
  document.getElementById("movieTime").textContent =
    booking.date + " - " + booking.time;

  // Khu vực, rạp, ghế
  document.getElementById("movieSeats").textContent =
    booking.area +
    " - " +
    booking.cinema +
    " | Ghế: " +
    booking.seats.join(", "); // nối mảng ghế thành chuỗi

  // ===== GIÁ TIỀN =====

  const ticketPrice = booking.totalPrice;

  // Hiển thị giá vé (format tiền Việt)
  document.getElementById("ticketPrice").textContent =
    ticketPrice.toLocaleString("vi-VN") + "đ";

  // Tổng tiền (ở đây chưa có phí hay giảm giá)
  document.getElementById("totalPrice").textContent =
    ticketPrice.toLocaleString("vi-VN") + "đ";

  // ===== XỬ LÝ FORM THANH TOÁN =====

  const form = document.querySelector(".payment-form");

  // Khi submit form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // chặn reload trang

    // Lấy dữ liệu người dùng nhập
    const bank = document.getElementById("bank-select").value;
    const cardNumber = document.getElementById("card-number").value;
    const email = document.getElementById("email").value;
    const discountCode = document.getElementById("discount-code").value;

    // Gộp dữ liệu booking + thông tin thanh toán
    const paymentInfo = {
      ...booking, // spread toàn bộ dữ liệu cũ
      bank,
      cardNumber,
      email,
      discountCode,
    };

    // Lưu lại booking hoàn chỉnh
    localStorage.setItem("finalBooking", JSON.stringify(paymentInfo));

    // Chuyển sang trang xác nhận
    window.location.href = "/html/confirmation.html";
  });
});
