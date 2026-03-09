const booking = JSON.parse(localStorage.getItem("booking"));
const PRICE_PER_SEAT = 65000;

document.getElementById("infoMovie").textContent =
"Phim: " + booking.movie;

document.getElementById("infoLocation").textContent =
"Địa điểm: " + booking.area + " - " + booking.cinema;

document.getElementById("infoShowtime").textContent =
"Suất chiếu: " + booking.date + " - " + booking.time;

const storageKey =
booking.movie + "_" +
booking.cinema + "_" +
booking.date + "_" +
booking.time;

const bookedSeats =
JSON.parse(localStorage.getItem(storageKey)) || [];

const seatContainer = document.getElementById("seatContainer");
const selectedSeatsText = document.getElementById("selectedSeats");
const totalPriceText = document.getElementById("totalPrice");
const nextBtn = document.getElementById("nextBtn");

const rows=["A","B","C","D","E"];
const totalSeatsPerRow=12;
const aisleAfter=6;

let selectedSeats=[];

function updateSummary(){
  selectedSeatsText.textContent=
  selectedSeats.length?selectedSeats.join(", "):"Chưa chọn";

  totalPriceText.textContent=
  (selectedSeats.length*PRICE_PER_SEAT).toLocaleString("vi-VN");

  nextBtn.disabled=selectedSeats.length===0;
}

rows.forEach(row=>{
  for(let i=1;i<=totalSeatsPerRow;i++){

    if(i===aisleAfter+1){
      const aisle=document.createElement("div");
      aisle.className="aisle";
      seatContainer.appendChild(aisle);
    }

    const seat=document.createElement("div");
    seat.textContent=row+i;

    if(bookedSeats.includes(seat.textContent)){
      seat.className="seat sold";
    }else{
      seat.className="seat available";
    }

    seat.onclick=()=>{
      if(seat.classList.contains("sold")) return;

      if(seat.classList.contains("selected")){
        seat.classList.remove("selected");
        selectedSeats=selectedSeats.filter(s=>s!==seat.textContent);
      }else{
        seat.classList.add("selected");
        selectedSeats.push(seat.textContent);
      }

      updateSummary();
    };

    seatContainer.appendChild(seat);
  }
});

nextBtn.onclick=()=>{
  document.getElementById("fcMovie").textContent=
  "Phim: "+booking.movie;

  document.getElementById("fcLocation").textContent=
  "Địa điểm: "+booking.area+" - "+booking.cinema;

  document.getElementById("fcShowtime").textContent=
  "Suất chiếu: "+booking.date+" - "+booking.time;

  document.getElementById("fcSeats").textContent=
  "Ghế: "+selectedSeats.join(", ");

  document.getElementById("fcTotal").textContent=
  "Tổng tiền: "+(selectedSeats.length*PRICE_PER_SEAT).toLocaleString("vi-VN")+" VNĐ";

  document.getElementById("confirmModal").style.display="flex";
};

function confirmBooking(){
  booking.seats=selectedSeats;
  booking.totalPrice=selectedSeats.length*PRICE_PER_SEAT;
  localStorage.setItem("pendingBooking",JSON.stringify(booking));
  window.location.href="payment.html";
}

function closeModal(){
  document.getElementById("confirmModal").style.display="none";
}

window.onclick=function(e){
  const modal=document.getElementById("confirmModal");
  if(e.target===modal){
    modal.style.display="none";
  }
};

function goBack(){
  window.location.href="showtime.html";
}