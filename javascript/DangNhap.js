//lấy form đăng nhap
let loginForm = document.getElementById("loginForm");

//ô input
let loginName = document.getElementById("loginName");
let loginContact = document.getElementById("loginContact");
let loginPass = document.getElementById("loginPass");

//hiển thị lỗi khi không thỏa điều kiện hoặc nhập sai
let errName = document.getElementById("errName");
let errContact = document.getElementById("errContact");
let errPass = document.getElementById("errPass");
let loginError = document.getElementById("loginError");

//hàm bắt đầu chạy khi bấm submit
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //lấy các giá trị nhập vào, trim()): bỏ các khoảng trống đầu cuối
    let name = loginName.value.trim();
    let contact = loginContact.value.trim();
    let pass = loginPass.value.trim();

    //reset thông báo lỗi trước khi validate lại
    errName.innerText = "";
    errContact.innerText = "";
    errPass.innerText = "";
    loginError.innerText = "";

    let isValid = true;

    // ============= validate input =============
    // nhập tên
    if (name === "") {
      errName.innerText = "Vui lòng nhập tên";
      loginName.focus();
      isValid = false;
    }

    //kiểm tra có nhập hay không, nếu khác với nội dung đăng ký thì không check regex
    if (contact === "") {
      errContact.innerText = "Nhập email";
      if (isValid) loginContact.focus(); //chỉ focus lỗi đầu tiên
      isValid = false;
    }

    //nhâp mật khẩu ít nhất 6 kí tự
    if (pass.length < 6) {
      errPass.innerText = "Mật khẩu ít nhất 6 ký tự";
      if (isValid) loginPass.focus(); //chỉ focus vào ô khi ô trước ô này không có lỗi
      isValid = false;
    }

    //nếu các giá trị nhập vào không hợp lệ với điều kiện thì dừng hàm
    if (!isValid) return;

    //tra danh dách tài khoản được lưu trong localStorage
    let users = JSON.parse(localStorage.getItem("users"));

    //nếu các giá trị nhập vào không tìm thấy trong localStorage thì chưa có tài khoản
    if (!users || users.length === 0) {
      loginError.innerText = "Chưa có tài khoản";
      return;
    }

    // ========== B1: kiểm tra name + contact ==========
    let foundUser = users.find(
      //find: tìm user thỏa điều kiện là đúng số điện thoại hoặc email
      (u) => u.name === name && u.email === contact,
    );

    //nếu không kiếm thấy
    if (!foundUser) {
      loginError.innerText = "Sai tên hoặc email";
      return;
    }

    // ========== B2: kiểm tra password riêng ==========
    if (foundUser.pass !== pass) {
      // so sánh password
      errPass.innerText = "Sai mật khẩu";
      loginPass.focus();
      return;
    }

    //  Đăng nhập thành công, lưu thông tin tài khoản được dăng nhập
    //phải có lưu tài khoản nếu không khi chuyển sang trang khác thì thông tin sẽ bị reload
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    //nhập đúng hết thì tự động chuyển sang trang chủ
    window.location.href = "/html/trangchu.html";
  });
}
