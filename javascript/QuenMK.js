//lấy lại mật khẩu
function getPassword() {
  //lấy dữ dữ liệu từ người nhập
  let contact = document.getElementById("contact").value.trim();

  //hiển thị thông báo. Đúng thì hiện mật khẩu, sai thì báo lỗi
  let result = document.getElementById("result");

  //lấy danh sách dữ liệu từ localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  //dùng .find để tìm user
  let foundUser = users.find((u) => u.email === contact || u.phone === contact);

  //nếu ô input bị bỏ trống
  if (contact === "") {
    result.innerText = "Vui lòng nhập email hoặc số điện thoại";
    return;
  }

  //nếu không tìm thấy
  if (!foundUser) {
    result.innerText = "Không tìm thấy email hoặc số điện thoại";
  } else {
    //tìm thấy thì hiện mật khẩu
    result.innerText = "Mật khẩu của bạn: " + foundUser.pass;
  }
}
