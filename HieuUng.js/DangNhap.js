let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = loginName.value.trim();
  let phone = loginPhone.value.trim();
  let pass = loginPass.value.trim();

  errName.innerText = "";
  errPhone.innerText = "";
  errPass.innerText = "";

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Chưa có tài khoản, vui lòng đăng ký!");
    window.location.href = "register.html";
    return;
  }

  if (name === "") {
    errName.innerText = "Tên không được để trống";
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    errPhone.innerText = "Số điện thoại không hợp lệ";
    return;
  }

  if (pass.length < 6) {
    errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
    return;
  }

  if (name !== user.name || phone !== user.phone || pass !== user.pass) {
    alert("Thông tin đăng nhập sai!");
    return;
  }

  alert("Đăng nhập thành công!");
});
