// Đợi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu thanh toán cuối cùng
  const booking = JSON.parse(localStorage.getItem("finalBooking"));

  // Nếu không có dữ liệu → quay lại trang thanh toán
  if (!booking) {
    alert("Không có dữ liệu thanh toán");
    window.location.href = "/html/Payment.html";
    return;
  }

  // ===== POSTER =====
  let poster = booking.poster;

  // Nếu không có poster trong booking → lấy từ selectedMovie
  if (!poster) {
    const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
    if (movieData && movieData.poster) {
      poster = movieData.poster;
    }
  }

  // Hiển thị poster
  document.getElementById("moviePoster").src = poster;

  // ===== HIỂN THỊ THÔNG TIN =====
  document.getElementById("movieName").textContent = booking.movie;

  document.getElementById("movieTime").textContent =
    booking.date + " - " + booking.time;

  document.getElementById("movieSeats").textContent =
    booking.area +
    " - " +
    booking.cinema +
    " | Ghế: " +
    booking.seats.join(", ");

  // Giá vé ban đầu
  document.getElementById("ticketPrice").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";

  // ===== XỬ LÝ MÃ GIẢM GIÁ =====

  // Danh sách mã hợp lệ
  const discountCodes = ["thaylinhsomot", "cimovievippro"];

  const userCode = booking.discountCode;

  let discountPrice = 0;

  // Nếu mã hợp lệ → giảm 10%
  if (discountCodes.includes(userCode.toLowerCase())) {
    discountPrice = (booking.totalPrice * 10) / 100;
  }

  // Trừ tiền sau khi giảm
  booking.totalPrice = booking.totalPrice - discountPrice;

  // Lưu lại giá mới
  localStorage.setItem("finalBooking", JSON.stringify(booking));

  // Hiển thị tiền giảm
  document.getElementById("discount").textContent =
    discountPrice.toLocaleString("vi-VN") + "đ";

  // Hiển thị tổng tiền sau giảm
  document.getElementById("totalPrice").textContent =
    booking.totalPrice.toLocaleString("vi-VN") + "đ";

  // ===== THÔNG TIN THANH TOÁN =====
  document.getElementById("confirmBank").textContent = booking.bank;
  document.getElementById("confirmCardNum").textContent = booking.cardNumber;
  document.getElementById("confirmEmail").textContent = booking.email;

  // ===== NÚT QUAY LẠI =====
  const gobackBtn = document.getElementById("btnback");
  gobackBtn.addEventListener("click", function () {
    window.location.href = "/html/Payment.html";
  });

  // ===== NÚT XÁC NHẬN THANH TOÁN =====
  const confirmBtn = document.getElementById("btnsub");

  confirmBtn.addEventListener("click", function () {
    // Hiển thị popup thành công (SweetAlert)
    Swal.fire({
      title: "Thành công!",
      text: "Thanh toán của bạn đã hoàn tất.",
      icon: "success",
      confirmButtonText: "Tuyệt vời",
    }).then((result) => {
      // Khi user bấm OK → chuyển trang
      if (result.isConfirmed) {
        window.location.href = "/html/alertsuccess.html";
      }
    });
  });
});
