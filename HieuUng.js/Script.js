// Lấy form
let loginForm = document.getElementById("loginForm");

// Lấy input
let loginName = document.getElementById("loginName");
let loginPhone = document.getElementById("loginPhone");
let loginPass = document.getElementById("loginPass");

// Lấy span báo lỗi
let errName = document.getElementById("errName");
let errPhone = document.getElementById("errPhone");
let errPass = document.getElementById("errPass");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy giá trị
  let name = loginName.value.trim();
  let phone = loginPhone.value.trim();
  let pass = loginPass.value.trim();

  // Reset lỗi
  errName.innerText = "";
  errPhone.innerText = "";
  errPass.innerText = "";

  let isValid = true;

  if (name === "") {
    errName.innerText = "Tên không được để trống";
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    errPhone.innerText = "số điện thoại không hợp lệ";
    isValid = false;
  }

  if (pass.length < 6) {
    errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  if (!isValid) return;
});
