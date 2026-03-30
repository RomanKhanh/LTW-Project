//lấy form đăng ký
let registerForm = document.getElementById("registerForm");

//ô input
let regName = document.getElementById("regName");
let regEmail = document.getElementById("regEmail");
let regPass = document.getElementById("regPass");

//hiển thị lỗi khi không thỏa điều kiện hoặc nhập sai
let errRegName = document.getElementById("errRegName");
let errRegEmail = document.getElementById("errRegEmail");
let errRegPass = document.getElementById("errRegPass");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    //khi bấm submit thì hàm sẽ chạy
    e.preventDefault(); // ngăn reload trang, làm mất dữ liệu đang có

    //lấy dữ liệu người dùng, trim():bỏ khoảng trống đầu cuối
    let name = regName.value.trim();
    let email = regEmail.value.trim();
    let pass = regPass.value.trim();

    //reset thông báo lỗi trước khi validate lại
    errRegName.innerText = "";
    errRegEmail.innerText = "";
    errRegPass.innerText = "";

    //nếu các giá trị nhập vào hợp lệ với điều kiện
    let isValid = true;

    //nếu tên để trống
    if (name === "") {
      errRegName.innerText = "Tên không được để trống";
      regName.focus(); //focus vào ô name khi có lỗi
      isValid = false; //giá trị sai->không thỏa điều kiện
    }

    //email bị trống
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      //kiểm tra xem có các kí tự đặc biệt thỏa tên mail không
      errRegEmail.innerText = "Email không hợp lệ";
      if (isValid) regEmail.focus(); //chỉ focus email khi ô nhập trước nó không có lỗi
      isValid = false;
    }

    //khi mật khẩu không thỏa điều kiện
    if (pass.length < 6) {
      // điều kiện: mật khẩu ít nhất 6 kí tự
      errRegPass.innerText = "Mật khẩu ít nhất 6 ký tự";
      if (isValid) regPass.focus(); //chỉ focus vào ô khi ô trước ô này không có lỗi
      isValid = false;
    }

    if (!isValid) return; //có lỗi thì dừng

    //lấy dữ liệu lưu trong localStorage, nếu chưa có thì sẽ tạo mảng rỗng lưu vào
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //hàm kiểm tra có trùng không
    //.some()) trả về true nếu có phần tử trùng
    let isExist = users.some((u) => u.email === email);

    //kiểm giá trị isExis để xem có trùng không
    if (isExist) {
      errRegEmail.innerText = "Email đã tồn tại";
      return;
    }

    //tạo user mới
    let newUser = {
      name: name,
      email: email,
      pass: pass,
    };

    //lưu user mới vào localStorage
    users.push(newUser);

    //lưu dưới dạng Json
    localStorage.setItem("users", JSON.stringify(users));

    // auto login luôn
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    //tự động chuyển qua Trang chủ khi đăng kí xong
    window.location.href = "/html/trangchu.html";
  });
}
