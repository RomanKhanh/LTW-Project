function getPassword() {
  let contact = document.getElementById("contact").value.trim();
  let result = document.getElementById("result");

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    result.innerText = "Chưa có tài khoản nào đăng ký";
    return;
  }

  if (contact === savedUser.phone || contact === savedUser.email) {
    result.innerText = "Mật khẩu của bạn là: " + savedUser.pass;
  } else {
    result.innerText = "Không tìm thấy email hoặc số điện thoại này";
  }
}
