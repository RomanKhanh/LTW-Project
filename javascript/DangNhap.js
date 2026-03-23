let loginForm = document.getElementById("loginForm");

let loginName = document.getElementById("loginName");
let loginContact = document.getElementById("loginContact");
let loginPass = document.getElementById("loginPass");

let errName = document.getElementById("errName");
let errContact = document.getElementById("errContact");
let errPass = document.getElementById("errPass");
let loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = loginName.value.trim();
    let contact = loginContact.value.trim();
    let pass = loginPass.value.trim();

    // reset lỗi
    errName.innerText = "";
    errContact.innerText = "";
    errPass.innerText = "";
    loginError.innerText = "";

    let isValid = true;

    // validate input
    if (name === "") {
      errName.innerText = "Vui lòng nhập tên";
      loginName.focus();
      isValid = false;
    }

    if (contact === "") {
      errContact.innerText = "Nhập email hoặc số điện thoại";
      if (isValid) loginContact.focus();
      isValid = false;
    }

    if (pass.length < 6) {
      errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
      if (isValid) loginPass.focus();
      isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
      loginError.innerText = "Chưa có tài khoản";
      return;
    }

    // 🔹 B1: kiểm tra name + contact
    let foundUser = users.find(
      (u) =>
        u.name === name &&
        (u.phone === contact || u.email === contact)
    );

    if (!foundUser) {
      loginError.innerText = "Sai tên hoặc email/sđt";
      return;
    }

    // 🔹 B2: kiểm tra password riêng
    if (foundUser.pass !== pass) {
      errPass.innerText = "Sai mật khẩu";
      loginPass.focus();
      return;
    }

    // 🔹 Đăng nhập thành công
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    window.location.href = "/html/trangchu.html";
  });
}
