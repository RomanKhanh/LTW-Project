// Đợi HTML load xong
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu booking đã thanh toán
  const booking = JSON.parse(localStorage.getItem("finalBooking"));

  // Nếu không có dữ liệu → quay lại trang thanh toán
  if (!booking) {
    alert("Không có dữ liệu thanh toán");
    window.location.href = "/html/Payment.html";
    return;
  }

  // ===== POSTER =====
  let poster = booking.poster;

  // Nếu booking không có poster → lấy từ selectedMovie
  if (!poster) {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (movieData && movieData.poster) {
      poster = movieData.poster;
    }
  }

  // ⚠️ (mày đang thiếu đoạn hiển thị poster)

  // ===== HIỂN THỊ THÔNG TIN =====

  // Tên phim
  document.getElementById("movieName").textContent = booking.movie;

  // Thời gian chiếu
  document.getElementById("time").textContent =
    booking.date + " - " + booking.time;

  // Địa điểm (khu vực + rạp)
  document.getElementById("location").textContent =
    booking.area + " - " + booking.cinema;

  // Ghế (join mảng thành chuỗi)
  document.getElementById("seats").textContent = booking.seats.join(",");

  // Tổng tiền (đã thanh toán)
  document.getElementById("price").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";

  // ===== NÚT VỀ TRANG CHỦ =====
  const homeBtn = document.getElementById("homebtn");

  homeBtn.addEventListener("click", function () {
    window.location.href = "/html/trangchu.html";
  });
});
