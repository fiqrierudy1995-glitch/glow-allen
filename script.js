// ==========================
// === DOM References ===
// ==========================

// Main container
const frame = document.getElementById("frame");
const scrollContainer = document.getElementById("scrollContainer");
const openBtn = document.getElementById("openBtn");

// Music
const musicToggleBtn = document.getElementById("musicToggle");

// Couple & Parents
const groomText = document.querySelector(".groom-text");
const brideText = document.querySelector(".bride-text");
const parent1Text = document.querySelector(".parent1-text");
const parent2Text = document.querySelector(".parent2-text");
const parent3Text = document.querySelector(".parent3-text");

// Kata Aluan & Verse
const kataAluanText = document.querySelector(".aluan-text");
const verseText = document.querySelector(".verse-text");

// Date & Time
const dateText = document.querySelector(".date1-text");
const timeText = document.querySelector(".hour1-text");

// Venues
const ceremonyVenueName = document.querySelector(".venue-item.ceremony .venue-name");
const ceremonyVenueDesc = document.querySelector(".venue-item.ceremony .venue-desc");
const receptionVenueName = document.querySelector(".venue-item.reception .venue-name");
const receptionVenueDesc = document.querySelector(".venue-item.reception .venue-desc");

// Programme
const programmeContainer = document.getElementById("atur");

// Prayer
const prayerText = document.getElementById("doa-melayu");

// Photo carousel
const photoCarousel = document.querySelector(".photo-carousel");
const photoCaption = document.getElementById("fixedCaption");

// Cover image
const coverImage = document.getElementById("coverImage");

// RSVP & wishes
const rsvpBtn = document.getElementById("rsvpBtn");
const popupRSVP = document.getElementById("popupRSVP");
const hadirBtn = document.getElementById("hadirBtn");
const tidakhadirBtn = document.getElementById("tidakhadirBtn");
const rsvpForm = document.getElementById("rsvpForm");
const hantarBtn = document.getElementById("hantarBtn");
const batalBtn = document.getElementById("batalBtn");
const rsvpFormtidak = document.getElementById("rsvpFormtidak");
const hantarBtntidak = document.getElementById("hantarBtntidak");
const batalBtntidak = document.getElementById("batalBtntidak");
const hadirRow = document.querySelector(".hadir-row");
const hadirBersama = document.getElementById("hadirBersama");
const jumlahKehadiran = document.getElementById("jumlahKehadiran");
const messageDiv = document.getElementById("message");
const ucapanList = document.getElementById("ucapanList");

// Calendar, location & contact
const callBtn = document.getElementById("callBtn");
const popupCon = document.getElementById("popupcon");
const locationBtn = document.getElementById("locationBtn");
const popupLoc = document.getElementById("popuploc");
const androidedBtn1 = document.getElementById("androidedBtn1");
const iosedBtn1 = document.getElementById("iosedBtn1");
const androidedBtn2 = document.getElementById("androidedBtn2");
const iosedBtn2 = document.getElementById("iosedBtn2");

// Google Sheet script
const scriptURL = "https://script.google.com/macros/s/AKfycbzuOtSCGwc66ykQi9ikofXrjVBN7qiKJQ4bRRuJNqjHjYn7SRo43o9gi9lL6oKePVhG/exec";

// Google Maps & Waze links
const googleMapsCeremonyUrl = "https://www.google.com/maps?q=The+Parish+of+St+Michael+%26+All+Angels,+Sandakan";
const wazeCeremonyUrl = "https://waze.com/ul?q=The+Parish+of+St+Michael+%26+All+Angels,+Sandakan&navigate=yes";
const googleMapsReceptionUrl = "https://www.google.com/maps?q=D'Rimba+House,+Sandakan";
const wazeReceptionUrl = "https://waze.com/ul?q=D'Rimba+House,+Sandakan&navigate=yes";

// ==========================
// === Populate Content ===
// ==========================
if (typeof weddingDetails !== "undefined") {
  document.title = `A Celebration of Love: ${weddingDetails.couple.groom} & ${weddingDetails.couple.bride}`;

  // Couple & Parents
  groomText && (groomText.textContent = weddingDetails.couple.groom);
  brideText && (brideText.textContent = weddingDetails.couple.bride);
  parent1Text && (parent1Text.textContent = weddingDetails.parents.groomParents);
  parent2Text && (parent2Text.textContent = "together with");
  parent3Text && (parent3Text.textContent = weddingDetails.parents.brideParents);

  // Kata Aluan & Verse
  kataAluanText && (kataAluanText.innerHTML = weddingDetails.kataAluan);
  verseText && (verseText.textContent = weddingDetails.verse);

  // Date & Time
  dateText && (dateText.textContent = weddingDetails.date.fullDate);
  timeText && (timeText.textContent = weddingDetails.date.time);

  // === Venues (safe version) ===
if (weddingDetails.venues?.ceremony) {
  ceremonyVenueName && (ceremonyVenueName.textContent = weddingDetails.venues.ceremony.name || "");
  ceremonyVenueDesc && (ceremonyVenueDesc.textContent = weddingDetails.venues.ceremony.address || "");
} else {
  document.querySelector(".venue-item:not(.custom-spacing)")?.style.setProperty("display", "none");
}

if (weddingDetails.venues?.reception) {
  receptionVenueName && (receptionVenueName.textContent = weddingDetails.venues.reception.name || "");
  receptionVenueDesc && (receptionVenueDesc.textContent = weddingDetails.venues.reception.address || "");
} else {
  document.querySelector(".venue-item.custom-spacing")?.style.setProperty("display", "none");
}

  // Programme
  if (programmeContainer && weddingDetails.programme) {
    programmeContainer.innerHTML = '<h3 class="majlis0-text">PROGRAMME</h3>';
    weddingDetails.programme.forEach((item, index) => {
      const h4 = document.createElement("h4");
      h4.className = `majlis${index * 2 + 1}-text`;
      h4.textContent = item.time;
      const p = document.createElement("p");
      p.className = `majlis${index * 2 + 2}-text`;
      p.textContent = item.activity;
      programmeContainer.appendChild(h4);
      programmeContainer.appendChild(p);
    });
  }

  // Prayer
  prayerText && (prayerText.innerHTML = weddingDetails.prayer);

  // Photos
  if (photoCarousel && weddingDetails.photos) {
    photoCarousel.innerHTML = "";
    weddingDetails.photos.forEach((photo) => {
      const div = document.createElement("div");
      div.className = "photo-item";
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      div.appendChild(img);
      photoCarousel.appendChild(div);
    });
  }
  photoCaption && (photoCaption.textContent = weddingDetails.photoCaption);
}

// ==========================
// === Curtain, Cover, Music & Auto-Scroll ===
// ==========================
frame && addSnowflakes(); // snowflakes

// Cover image initially
if (coverImage && weddingDetails.cover) {
  coverImage.src = weddingDetails.cover.image;
}

// Auto-scroll
function createAutoScroll(container, duration = 60000, resumeDelay = 3000) {
  let scrolling = false, resumeTimeout, ignoreNextInteraction = true;
  const startScrollFn = () => {
    if (scrolling) return;
    scrolling = true;
    const startScroll = container.scrollTop;
    const distance = container.scrollHeight - container.clientHeight - startScroll;
    const startTime = performance.now();
    const step = (ts) => {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startScroll + distance * progress;
      if (progress < 1 && scrolling) requestAnimationFrame(step);
      else scrolling = false;
    };
    requestAnimationFrame(step);
  };
  const stopScrollFn = () => scrolling = false;
  const onUserScroll = () => {
    if (ignoreNextInteraction) { ignoreNextInteraction = false; return; }
    stopScrollFn();
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(startScrollFn, resumeDelay);
  };
  container.addEventListener("wheel", onUserScroll, { passive: true });
  container.addEventListener("touchstart", onUserScroll, { passive: true });
  return startScrollFn;
}

const startAutoScroll = scrollContainer ? createAutoScroll(scrollContainer) : null;

// Music
const music = new Audio(weddingDetails.music?.src || "music.mp3");
music.loop = weddingDetails.music?.loop ?? true;
let musicPlaying = false;

function updateMusicButton() {
  if (!musicToggleBtn) return;
  musicToggleBtn.innerHTML = musicPlaying
    ? '<span class="material-symbols-outlined">pause_circle</span><span class="label">Pause</span>'
    : '<span class="material-symbols-outlined">play_circle</span><span class="label">Play</span>';
}

musicToggleBtn?.addEventListener("click", () => {
  if (musicPlaying) music.pause();
  else music.play().catch(()=>{});
  musicPlaying = !musicPlaying;
  updateMusicButton();
});

// Curtain open
openBtn?.addEventListener("click", () => {
  frame.classList.add("open");
  setTimeout(() => {
    document.getElementById("navBar")?.classList.add("show");
    scrollContainer && (scrollContainer.style.overflowY = "auto");

    music.play().then(() => { musicPlaying = true; updateMusicButton(); }).catch(()=>{});
    startAutoScroll && startAutoScroll();

    // Update cover after curtain
    if (coverImage && weddingDetails.cover) coverImage.src = weddingDetails.cover.image;

    // Load wishes
    loadUcapan();
    setInterval(loadUcapan, 3000);

  }, 1800);
});

// ==========================
// === Snowflakes ===
function addSnowflakes() {
  if (!scrollContainer) return;
  for (let i=0;i<50;i++){
    const wrapper = document.createElement("div");
    wrapper.className = "snowflake-wrapper";
    const flake = document.createElement("div");
    flake.className = "snowflake";
    const size = 6 + Math.random()*10;
    flake.style.width = flake.style.height = size+"px";
    wrapper.style.left = Math.random()*window.innerWidth+"px";
    flake.style.animationDuration = `${8+Math.random()*10}s, ${3+Math.random()*4}s`;
    wrapper.style.animationDuration = `${4+Math.random()*4}s`;
    wrapper.appendChild(flake);
    scrollContainer.appendChild(wrapper);
  }
}

// ==========================
// === Countdown ===
const weddingDate = new Date("December 22, 2025 11:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "<h3>The ceremony has begun 🎉</h3>";
    return;
  }
  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);
  document.getElementById("hari").innerText = days;
  document.getElementById("jam").innerText = hours;
  document.getElementById("minit").innerText = minutes;
  document.getElementById("saat").innerText = seconds;
}
setInterval(updateCountdown,1000); updateCountdown();

// Open Popup
document.getElementById("moneyGiftBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("popupmoney").classList.add("show");
});

// Close popup
document.getElementById("closeMoneyBtn").addEventListener("click", () => {
  document.getElementById("popupmoney").classList.remove("show");
});

// Close when clicking outside popup
document.getElementById("popupmoney").addEventListener("click", (e) => {
  if (e.target.id === "popupmoney") {
    document.getElementById("popupmoney").classList.remove("show");
  }
});

// ==========================
// === Calendar, Contact & Location ===
// ==========================

callBtn?.addEventListener("click", e=>{e.preventDefault(); popupCon.style.display="flex";});
popupCon?.addEventListener("click", e=>{if(e.target===popupCon) popupCon.style.display="none";});
locationBtn?.addEventListener("click", e=>{e.preventDefault(); popupLoc.style.display="flex";});
popupLoc?.addEventListener("click", e=>{if(e.target===popupLoc) popupLoc.style.display="none";});

androidedBtn1?.addEventListener("click", ()=>window.open(googleMapsCeremonyUrl,"_blank"));
iosedBtn1?.addEventListener("click", ()=>window.open(wazeCeremonyUrl,"_blank"));
androidedBtn2?.addEventListener("click", ()=>window.open(googleMapsReceptionUrl,"_blank"));
iosedBtn2?.addEventListener("click", ()=>window.open(wazeReceptionUrl,"_blank"));

// ==========================
// === RSVP ===
// ==========================

let rsvpChoice = "";

function resetRSVP() {
  rsvpForm.style.display = "none";
  rsvpFormtidak.style.display = "none";
  hadirRow.style.display = "flex";
  hadirBersama.style.display = "none";
  rsvpChoice = "";
  document.querySelector(".rsvppopup")?.classList.remove("expanded");
}

// Open popup
rsvpBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  popupRSVP.style.display = "flex";
});

// Close popup when clicking outside the form
popupRSVP?.addEventListener("click", (e) => {
  if (e.target === popupRSVP) {
    popupRSVP.style.display = "none";
    resetRSVP();
  }
});

// RSVP options
hadirBtn?.addEventListener("click", () => {
  rsvpChoice = "Hadir";
  rsvpForm.style.display = "block";
  rsvpFormtidak.style.display = "none";
  hadirRow.style.display = "none";
  document.querySelector(".rsvppopup")?.classList.add("expanded");
});

tidakhadirBtn?.addEventListener("click", () => {
  rsvpChoice = "Tidak Hadir";
  rsvpFormtidak.style.display = "block";
  rsvpForm.style.display = "none";
  hadirRow.style.display = "none";
  document.querySelector(".rsvppopup")?.classList.add("expanded");
});

// Cancel buttons
batalBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  rsvpForm.reset();
  popupRSVP.style.display = "none";
  resetRSVP();
});

batalBtntidak?.addEventListener("click", (e) => {
  e.preventDefault();
  rsvpFormtidak.reset();
  popupRSVP.style.display = "none";
  resetRSVP();
});

// Form submission
async function submitRSVP(form, url, rsvpChoice) {
  const btn = form.querySelector("button[type='submit']");
  messageDiv.style.display = "block";
  messageDiv.style.backgroundColor = "transparant";
  messageDiv.style.color = "black";
  messageDiv.textContent = "Sending your wish...";
  btn.disabled = true;

  try {
    const formDataObj = Object.fromEntries(new FormData(form).entries());
    formDataObj["Kehadiran"] = rsvpChoice;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formDataObj),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    });

    const data = await resp.json();
    if (data.status === "success") {
      messageDiv.textContent =
        rsvpChoice === "Hadir"
          ? "Thank you for your lovely wish! 💌"
          : "Thank you! We understand you won’t be able to join us on our special day. 💌";
      messageDiv.style.backgroundColor =
        rsvpChoice === "Hadir" ? "#fdfdfdff" : "#fdfdfdff";
      messageDiv.style.color = rsvpChoice === "Hadir" ? "#000" : "#363636";
      form.reset();

      setTimeout(() => {
        popupRSVP.style.display = "none";
        resetRSVP();
      }, 2000);
    } else throw new Error(data.message || "Submission failed");
  } catch (err) {
    console.error(err);
    messageDiv.textContent = "Ralat: " + err.message;
    messageDiv.style.backgroundColor = "#f14668";
    messageDiv.style.color = "white";
  } finally {
    btn.disabled = false;
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 4000);
  }
}

rsvpForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitRSVP(rsvpForm, scriptURL, "Hadir");
});

rsvpFormtidak?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitRSVP(rsvpFormtidak, scriptURL, "Tidak Hadir");
});

// ==========================
// === Load Wishes / Ucapan ===
async function loadUcapan(){
  if(!ucapanList) return;
  try{
    const response=await fetch(scriptURL);
    const data=await response.json();
    if(data.status==="success" && Array.isArray(data.ucapans)){
      if(data.ucapans.length===0){ucapanList.innerHTML=`<p>No wishes yet — be the first to send your love! 💌</p>`; return;}
      ucapanList.innerHTML = data.ucapans.map(({ucapan,nama,jenis})=>`<div class="ucapan-item ${jenis==="Tidak Hadir"?"tidak-hadir":"hadir"}"><p class="ucapan-text">"${ucapan}"</p>${nama?`<p class="ucapan-nama">– ${nama}</p>`:""}</div>`).join("");
    } else ucapanList.innerHTML=`<p>❌ ${data.message||"Tiada ucapan ditemui"}</p>`;
  } catch(err){console.error(err); ucapanList.innerHTML=`<p>⚠️ Oops! Failed to load wishes. Please try again. 💌</p>`;}
}

// ==========================
// === Kehadiran form logic ===
function toggleHadirBersama(){hadirBersama.style.display=jumlahKehadiran.value==="2"?"block":"none";}
jumlahKehadiran?.addEventListener("change", toggleHadirBersama);

// ==========================
// === Initialization ===
document.addEventListener("DOMContentLoaded", ()=>{
  toggleHadirBersama();
  // Default style, if any
  styleSwitcher && applyStyle(styleSwitcher.value);
  // Load wishes (auto-refresh after curtain opens)
});
