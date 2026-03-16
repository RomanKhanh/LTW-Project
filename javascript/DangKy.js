let registerForm = document.getElementById("registerForm");

// input
let regName = document.getElementById("regName");
let regPhone = document.getElementById("regPhone");
let regPass = document.getElementById("regPass");

// error span
let errRegName = document.getElementById("errRegName");
let errRegPhone = document.getElementById("errRegPhone");
let errRegPass = document.getElementById("errRegPass");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = regName.value.trim();
  let phone = regPhone.value.trim();
  let pass = regPass.value.trim();

  // reset lỗi
  errRegName.innerText = "";
  errRegPhone.innerText = "";
  errRegPass.innerText = "";

  let isValid = true;

  // kiểm tra tên
  if (name === "") {
    errRegName.innerText = "Tên không được để trống";
    isValid = false;
  }

    // kiểm tra sđt
  if (!/^[0-9]{10}$/.test(phone)) {
    errRegPhone.innerText = "chưa điền đúng số điện thoại";
    isValid = false;
  }

    // kiểm tra mật khẩu
  if (pass.length < 6) {
    errRegPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

if (!isValid) return;

// kiểm tra tài khoản đã tồn tại chưa
let savedUser = JSON.parse(localStorage.getItem("user"));

if (savedUser && savedUser.phone === phone) {
  errRegPhone.innerText = "Số điện thoại này đã được đăng ký";
  return;
}

// lưu tài khoản 
localStorage.setItem(
  "user",
  JSON.stringify({
    name: name,
    phone: phone,
    pass: pass,
  }),
);

// chuyển trang
window.location.href = "/html/TrangChu.html"; // gắn linh trang chủ vào đây
}
);

