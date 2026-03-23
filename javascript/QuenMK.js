function getPassword() {

  let contact = document.getElementById("contact").value.trim();
  let result = document.getElementById("result");

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    result.innerText = "Chưa có tài khoản nào";
    return;
  }

  if (contact === user.email || contact === user.phone) {
    result.innerText = "Mật khẩu của bạn: " + user.pass;
  } else {
    result.innerText = "Không tìm thấy email hoặc số điện thoại";
  }
}
