let registerForm = document.getElementById("registerForm");

let regName = document.getElementById("regName");
let regEmail = document.getElementById("regEmail");
let regPhone = document.getElementById("regPhone");
let regPass = document.getElementById("regPass");

let errRegName = document.getElementById("errRegName");
let errRegEmail = document.getElementById("errRegEmail");
let errRegPhone = document.getElementById("errRegPhone");
let errRegPass = document.getElementById("errRegPass");

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
    isValid = false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errRegEmail.innerText = "Email không hợp lệ";
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    errRegPhone.innerText = "Số điện thoại không hợp lệ";
    isValid = false;
  }

  if (pass.length < 6) {
    errRegPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  if (!isValid) return;

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && (savedUser.phone === phone || savedUser.email === email)) {
    errRegPhone.innerText = "Email hoặc SĐT đã tồn tại";
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      pass: pass,
    })
  );

  window.location.href = "/html/trangchu.html";
});
