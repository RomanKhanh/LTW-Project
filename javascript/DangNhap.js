let loginForm = document.getElementById("loginForm");

let loginName = document.getElementById("loginName");
let loginContact = document.getElementById("loginContact");
let loginPass = document.getElementById("loginPass");

let errName = document.getElementById("errName");
let errContact = document.getElementById("errContact");
let errPass = document.getElementById("errPass");
let loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = loginName.value.trim();
  let contact = loginContact.value.trim();
  let pass = loginPass.value.trim();

  errName.innerText = "";
  errContact.innerText = "";
  errPass.innerText = "";
  loginError.innerText = "";

  let isValid = true;

  if (name === "") {
    errName.innerText = "Vui lòng nhập tên";
    isValid = false;
  }

  if (contact === "") {
    errContact.innerText = "Nhập email hoặc số điện thoại";
    isValid = false;
  }

  if (pass.length < 6) {
    errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  if (!isValid) return;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    loginError.innerText = "Chưa có tài khoản";
    return;
  }

  if (
    user.name === name &&
    (user.phone === contact || user.email === contact) &&
    user.pass === pass
  ) {
    window.location.href = "/html/trangchu.html";
  } else {
    loginError.innerText = "Thông tin đăng nhập không đúng";
  }
});
