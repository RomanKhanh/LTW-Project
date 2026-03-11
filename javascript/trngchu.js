// Xử lý khi nhấn nút đặt vé

const buttons = document.querySelectorAll(".btn-booking");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        alert("Bạn đã chọn đặt vé phim 🎬");
    });
});