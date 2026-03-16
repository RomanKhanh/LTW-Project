function getPassword() {
  let phone = document.getElementById("phone").value.trim();
  let result = document.getElementById("result");

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    result.innerText = "Chưa có tài khoản nào đăng ký";
    return;
  }

  if (phone === savedUser.phone) {
    result.innerText = "Mật khẩu của bạn là: " + savedUser.pass;
  } else {
    result.innerText = "Không tìm thấy số điện thoại này";
  }
}
