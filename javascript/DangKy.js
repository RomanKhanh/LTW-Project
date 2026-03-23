let registerForm = document.getElementById("registerForm");

let regName = document.getElementById("regName");
let regEmail = document.getElementById("regEmail");
let regPhone = document.getElementById("regPhone");
let regPass = document.getElementById("regPass");

let errRegName = document.getElementById("errRegName");
let errRegEmail = document.getElementById("errRegEmail");
let errRegPhone = document.getElementById("errRegPhone");
let errRegPass = document.getElementById("errRegPass");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = regName.value.trim();
    let email = regEmail.value.trim();
    let phone = regPhone.value.trim();
    let pass = regPass.value.trim();

    errRegName.innerText = "";
    errRegEmail.innerText = "";
    errRegPhone.innerText = "";
    errRegPass.innerText = "";

    let isValid = true;

    if (name === "") {
      errRegName.innerText = "Tên không được để trống";
      regName.focus();
      isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errRegEmail.innerText = "Email không hợp lệ";
      if (isValid) regEmail.focus();
      isValid = false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      errRegPhone.innerText = "Số điện thoại không hợp lệ";
      if (isValid) regPhone.focus();
      isValid = false;
    }

    if (pass.length < 6) {
      errRegPass.innerText = "Mật khẩu ít nhất 6 ký tự";
      if (isValid) regPass.focus();
      isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let isExist = users.some(
      (u) => u.email === email || u.phone === phone
    );

    if (isExist) {
      errRegPhone.innerText = "Email hoặc SĐT đã tồn tại";
      return;
    }

    let newUser = {
      name: name,
      email: email,
      phone: phone,
      pass: pass,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // auto login luôn
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "/html/trangchu.html";
  });
}
