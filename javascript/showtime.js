const cinemasByArea = {
  "Cần Thơ": ["CGV Vincom Xuân Khánh", "Lotte Cinema Ninh Kiều"],
  "TP. Hồ Chí Minh": ["CGV Landmark 81", "CGV Aeon Mall"],
  "Hà Nội": ["CGV Royal City", "CGV Vincom Bà Triệu"]
};

const showtimes = {
  "10/03/2026": ["10:00","13:30","16:45","19:30"],
  "11/03/2026": ["09:45","12:15","15:30","18:45"],
  "12/03/2026": ["11:00","14:30","17:45","20:15"]
};

let selectedArea = "Cần Thơ";
let selectedCinema = "";
let selectedDate = "10/03/2026";
let selectedTime = "";

const cinemaList = document.getElementById("cinemaList");
const showtimeList = document.getElementById("showtimeList");
const nextBtn = document.getElementById("nextBtn");

function updateConfirm(){
  document.getElementById("cfArea").textContent="Khu vực: "+selectedArea;
  document.getElementById("cfCinema").textContent="Rạp: "+selectedCinema;
  document.getElementById("cfDate").textContent="Ngày: "+selectedDate;
  document.getElementById("cfTime").textContent="Giờ: "+selectedTime;

  nextBtn.disabled = !(selectedCinema && selectedTime);
}

function renderCinemas(area){
  cinemaList.innerHTML="";

  cinemasByArea[area].forEach((cinema,i)=>{

    const label=document.createElement("label");
    label.innerHTML=`
      <input type="radio" name="cinema" value="${cinema}" ${i===0?"checked":""}>
      ${cinema}
    `;

    cinemaList.appendChild(label);
    cinemaList.appendChild(document.createElement("br"));
  });

  selectedCinema = cinemasByArea[area][0];
  updateConfirm();
}

function renderShowtimes(date){

  showtimeList.innerHTML="";

  showtimes[date].forEach(time=>{

    const div=document.createElement("div");
    div.className="showtime";
    div.textContent=time;

    div.onclick=()=>{

      document.querySelectorAll(".showtime").forEach(s=>{
        s.classList.remove("selected");
      });

      div.classList.add("selected");

      selectedTime=time;

      updateConfirm();
    };

    showtimeList.appendChild(div);

  });

}

renderCinemas(selectedArea);
renderShowtimes(selectedDate);
updateConfirm();

document.querySelectorAll("input[name='area']").forEach(r=>{

  r.onchange=()=>{

    selectedArea=r.value;

    renderCinemas(selectedArea);

  };

});

document.addEventListener("change",e=>{

  if(e.target.name==="cinema"){

    selectedCinema=e.target.value;

    updateConfirm();

  }

});

document.querySelectorAll(".date").forEach(btn=>{

  btn.onclick=()=>{

    document.querySelectorAll(".date").forEach(d=>{
      d.classList.remove("active");
    });

    btn.classList.add("active");

    selectedDate=btn.dataset.date;

    selectedTime="";

    renderShowtimes(selectedDate);

    updateConfirm();

  };

});

nextBtn.onclick=()=>{

  const booking={
    movie:"Kung Fu Panda 4",
    area:selectedArea,
    cinema:selectedCinema,
    date:selectedDate,
    time:selectedTime
  };

  localStorage.setItem("booking",JSON.stringify(booking));

  window.location.href = "seats.html";

};