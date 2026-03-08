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

  if (name === "") {
    errRegName.innerText = "Tên không được để trống";
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    errRegPhone.innerText = "chưa điền đúng số điện thoại";
    isValid = false;
  }

  if (pass.length < 6) {
    errRegPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  if (!isValid) return;

  // lưu tài khoản
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: name,
      phone: phone,
      pass: pass,
    }),
  );

  // chuyển sang trang giới thiệu hoặc trang chủ
  window.location.href = "TrangChu.html"; // gắn linh trang chủ vào đây
});
