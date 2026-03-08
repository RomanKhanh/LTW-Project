// lấy form
let loginForm = document.getElementById("loginForm");

// input
let loginName = document.getElementById("loginName");
let loginPhone = document.getElementById("loginPhone");
let loginPass = document.getElementById("loginPass");

// lỗi
let errName = document.getElementById("errName");
let errPhone = document.getElementById("errPhone");
let errPass = document.getElementById("errPass");
let loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = loginName.value.trim();
  let phone = loginPhone.value.trim();
  let pass = loginPass.value.trim();

  // reset lỗi
  errName.innerText = "";
  errPhone.innerText = "";
  errPass.innerText = "";
  loginError.innerText = "";

  let isValid = true;

  // kiểm tra tên
  if (name === "") {
    errName.innerText = "Vui lòng nhập tên";
    isValid = false;
  }

  // kiểm tra sđt
  if (!/^[0-9]{10}$/.test(phone)) {
    errPhone.innerText = "Số điện thoại không hợp lệ";
    isValid = false;
  }

  // kiểm tra mật khẩu
  if (pass.length < 6) {
    errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  if (!isValid) return;

  // lấy dữ liệu đã đăng ký
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    loginError.innerText = "Chưa có tài khoản";
    return;
  }

  // kiểm tra đăng nhập
  if (user.name === name && user.phone === phone && user.pass === pass) {
    // chuyển trang nếu đúng
    window.location.href = "TrangChu.html"; // gắn link trang chu vao dây
  } else {
    loginError.innerText = "Tên hoặc mật khẩu không đúng";
  }
});
