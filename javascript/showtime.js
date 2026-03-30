//đọc thông tin đã chọn từ localStrorage nếu k có dữ liệu chuyển về trang chủ
const movie = JSON.parse(localStorage.getItem("selectedMovie"));

if (!movie) {
  window.location.href = "trangchu.html";
}

//chứa dữ liệu về phim: thể loại, thời lượng, độ tuổi
const movieDB = {
  "Chiến Binh Cuối Cùng": {
    genre: "Hành động",
    duration: "120 phút",
    age: "C13 - Phù hợp từ 13 tuổi",
  },
  "Thế Giới Phép Thuật": {
    genre: "Phiêu lưu",
    duration: "105 phút",
    age: "P - Mọi lứa tuổi",
  },
  "Tiếng Gọi Đêm Khuya": {
    genre: "Kinh dị",
    duration: "110 phút",
    age: "C18 - Từ 18 tuổi",
  },
  "Siêu Quậy Học Đường": {
    genre: "Hài, học đường",
    duration: "95 phút",
    age: "C13 - Từ 13 tuổi",
  },
  "Hành Tinh Song Song": {
    genre: "Viễn tưởng",
    duration: "130 phút",
    age: "C13 - Từ 13 tuổi",
  },
  "Hẹn Ước Mùa Thu": {
    genre: "Tình cảm",
    duration: "100 phút",
    age: "P - Mọi lứa tuổi",
  },
};

//lấy thông tin phim từ movieDB rồi đổ dữ liệu lên HTML
const info = movieDB[movie.name];

document.getElementById("movieName").textContent = "Tên phim: " + movie.name;
document.getElementById("movieGenre").textContent = "Thể loại: " + info.genre;
document.getElementById("movieDuration").textContent =
  "Thời lượng: " + info.duration;
document.getElementById("movieAge").textContent = info.age;
document.getElementById("moviePoster").src = movie.poster;

//dữ liệu khu vực, rạp chiếu
const cinemasByArea = {
  "Cần Thơ": ["CGV Vincom Xuân Khánh", "Lotte Cinema Ninh Kiều"],
  "TP. Hồ Chí Minh": ["CGV Landmark 81", "CGV Aeon Mall"],
  "Hà Nội": ["CGV Royal City", "CGV Vincom Bà Triệu"],
};

//dữ liệu ngày, giờ chiếu phim
const showtimes = {
  "10/03/2026": ["10:00", "13:30", "16:45", "19:30"],
  "11/03/2026": ["09:45", "12:15", "15:30", "18:45"],
  "12/03/2026": ["11:00", "14:30", "17:45", "20:15"],
};

//ghi nhớ lựa chọn người dùng
let selectedArea = "Cần Thơ";
let selectedCinema = "";
let selectedDate = "10/03/2026";
let selectedTime = "";

const cinemaList = document.getElementById("cinemaList");
const showtimeList = document.getElementById("showtimeList");
const nextBtn = document.getElementById("nextBtn");

//hiển thị thông tin đã chọn, nếu chọn chưa đủ nút next sẽ không cho chọn
function updateConfirm() {
  document.getElementById("cfArea").textContent = "Khu vực: " + selectedArea;
  document.getElementById("cfCinema").textContent = "Rạp: " + selectedCinema;
  document.getElementById("cfDate").textContent = "Ngày: " + selectedDate;
  document.getElementById("cfTime").textContent = "Giờ: " + selectedTime;

  nextBtn.disabled = !(selectedCinema && selectedTime);
}

//tạo nút danh sách rạp theo khu vực, khi đổi khu vực các rạp cũng đổi
function renderCinemas(area) {
  cinemaList.innerHTML = "";

  cinemasByArea[area].forEach((cinema, i) => {
    const label = document.createElement("label");

    label.innerHTML = `
      <input type="radio" name="cinema" value="${cinema}" ${i === 0 ? "checked" : ""}>
      ${cinema}
    `;

    cinemaList.appendChild(label);
    cinemaList.appendChild(document.createElement("br"));
  });

  selectedCinema = cinemasByArea[area][0];

  updateConfirm();
}

//lấy dữ liệu và tạo các giờ chiếu phim, khi chọn nó sẽ được đánh dấu
function renderShowtimes(date) {
  showtimeList.innerHTML = "";

  showtimes[date].forEach((time) => {
    const div = document.createElement("div");

    div.className = "showtime";

    div.textContent = time;

    div.onclick = () => {
      document.querySelectorAll(".showtime").forEach((s) => {
        s.classList.remove("selected");
      });

      div.classList.add("selected");

      selectedTime = time;

      updateConfirm();
    };

    showtimeList.appendChild(div);
  });
}

//hiển thị danh sách rạp theo khu vực, giờ theo ngày và cập nhật thông tin 
renderCinemas(selectedArea);
renderShowtimes(selectedDate);
updateConfirm();

//khi người dùng đổi khu vực danh sách rạp sẽ đổi tương ứng
document.querySelectorAll("input[name='area']").forEach((r) => {
  r.onchange = () => {
    selectedArea = r.value;

    renderCinemas(selectedArea);
  };
});

//lưu rạp đã chọn và cập nhật xác nhận
document.addEventListener("change", (e) => {
  if (e.target.name === "cinema") {
    selectedCinema = e.target.value;

    updateConfirm();
  }
});

//đổi màu nút ngày đang chọn, lưu lại ngày, reset giờ đã chọn, gọi hàm hiển thị giờ
document.querySelectorAll(".date").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".date").forEach((d) => {
      d.classList.remove("active");
    });

    btn.classList.add("active");

    selectedDate = btn.dataset.date;

    selectedTime = "";

    renderShowtimes(selectedDate);

    updateConfirm();
  };
});

//khi ấn next lưu hết các thông tin phim, khu vực, rạp, ngày, giờ vào localstorage và chuyển qua trang seats
nextBtn.onclick = () => {
  const booking = {
    movie: movie.name,
    area: selectedArea,
    cinema: selectedCinema,
    date: selectedDate,
    time: selectedTime,
    poster: movie.poster,
  };

  localStorage.setItem("booking", JSON.stringify(booking));

  window.location.href = "seats.html";
};
