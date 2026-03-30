document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-booking");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Xác định đúng khung phim chứa nút vừa bấm
      const card = this.closest(".movie-card");
      if (!card) return;

      // Lấy tên và ảnh từ trong khung phim đó
      const movieName = card.querySelector("h3").innerText.trim();
      const moviePoster = card.querySelector("img").getAttribute("src");

      // Gom thông tin vào một đối tượng
      const movie = {
        name: movieName,
        poster: moviePoster,
        timestamp: new Date().getTime()
      };

      // Lưu tạm vào trình duyệt (để trang sau dùng được)
      localStorage.setItem("selectedMovie", JSON.stringify(movie));

      // Chuyển sang trang chọn suất chiếu
      window.location.href = "showtime.html";
    });
  });
});