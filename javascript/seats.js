//đọc thông tin từ localstorage nếu k có thì quay lại trang showtime
const booking = JSON.parse(localStorage.getItem("booking"));

if(!booking){
  window.location.href="../showtime/showtime.html";
}

//giá mỗi vé
const PRICE_PER_SEAT = 65000;

//hiển thị thông tin: Tên phim, địa điểm, suất chiếu
document.getElementById("infoMovie").textContent =
"Phim: " + booking.movie;

document.getElementById("infoLocation").textContent =
"Địa điểm: " + booking.area + " - " + booking.cinema;

document.getElementById("infoShowtime").textContent =
"Suất chiếu: " + booking.date + " - " + booking.time;

//tạo mã cho từng suất chiếu
const storageKey =
booking.movie + "_" +
booking.cinema + "_" +
booking.date + "_" +
booking.time;

//Lấy các ghế đã được đặt trước đó nếu chưa có thì tạo mảng rỗng
let bookedSeats =
JSON.parse(localStorage.getItem(storageKey)) || [];

//Lấy các vùng giao diện: Khu ghế, Danh sách ghế đã chọn,Tổng tiền,Nút Next
const seatContainer=document.getElementById("seatContainer");
const selectedSeatsText=document.getElementById("selectedSeats");
const totalPriceText=document.getElementById("totalPrice");
const nextBtn=document.getElementById("nextBtn");

//định nghĩa các ghế, tên ghế
const rows=["A","B","C","D","E"];
const totalSeatsPerRow=12;
const aisleAfter=6;

//lưu ghế người dùng đang chọn
let selectedSeats=[];

//hiển thị ghế đã chọn, tính tổng tiền, bật tắt nút next
function updateSummary(){

  selectedSeatsText.textContent=
  selectedSeats.length?selectedSeats.join(", "):"Chưa chọn";

  totalPriceText.textContent=
  (selectedSeats.length*PRICE_PER_SEAT).toLocaleString("vi-VN");

  nextBtn.disabled=selectedSeats.length===0;

}

//tạo toàn bộ ghế, lặp hàng, ghế, tạo khoảng giữa, đánh dấu ghế đã đặt hay chưa
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

//khi ấn vào ghế: nếu đã bán vé thì k tương tác được, nếu chưa chọn thì thêm vào danh sách chọn
//, nếu đã chọn thì bỏ chọn
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

//hiện thị lại toàn bộ thông tin đã chọn: phim, rạp, giờ, các ghế chọn, tổng tiền,
//mở popup xác nhận
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

//khi xác nhận lưu thông tin vào localstorage: ghế đã chọn, tổng tiền
//chuyển sang trang payment
function confirmBooking(){

  booking.seats = selectedSeats;
  booking.totalPrice = selectedSeats.length * PRICE_PER_SEAT;

  localStorage.setItem("pendingBooking", JSON.stringify(booking));

  window.location.href = "../html/payment.html";

}
 //đóng cửa sổ xác nhận
function closeModal(){

  document.getElementById("confirmModal").style.display="none";

}

//nút quay lại trang showtime
function goBack(){

  window.location.href="showtime.html";

}
 
//click ra ngoài popup sẽ đóng popup
window.onclick=function(e){

  const modal=document.getElementById("confirmModal");

  if(e.target===modal){

    modal.style.display="none";

  }

};