document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".payment-form");

    form.addEventListener("submit", function (event) {
        
        event.preventDefault();

        const bank = document.getElementById("bank-select").value;
        const cardNumber = document.getElementById("card-number").value;
        const email = document.getElementById("email").value;
        const discountCode = document.getElementById("discount-code").value;

        localStorage.setItem("bank", bank);
        localStorage.setItem("cardNumber", cardNumber);
        localStorage.setItem("email", email);
        localStorage.setItem("discountCode", discountCode);

        window.location.href="/html/confirmation.html";
    })
})    