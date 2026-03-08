document.addEventListener("DOMContentLoaded", function () {

    const bank = localStorage.getItem("bank");
    const cardNumber = localStorage.getItem("cardNumber");
    const email = localStorage.getItem("email");

    document.getElementById("confirmBank").textContent = bank;
    document.getElementById("confirmCardNum").textContent = cardNumber;
    document.getElementById("confirmEmail").textContent = email;
    
    const gobackBtn = document.getElementById("btnback");
    gobackBtn.addEventListener("click", function () {
        window.location.href="/html/Payment.html";
    })

    const confirmBtn = document.getElementById("btnsub");
    confirmBtn.addEventListener("click", function () {
        alert("Thanh toán thành công!");
        window.location.href="/html/alertsuccess.html";
    })
})