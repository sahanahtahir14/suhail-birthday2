// Confetti helper
function burstConfetti() {
  if (typeof confetti !== "function") return;
  const defaults = { spread: 70, ticks: 120, gravity: 0.6 };
  confetti({ particleCount: 80, angle: 60, origin: { x: 0 }, ...defaults });
  confetti({ particleCount: 80, angle: 120, origin: { x: 1 }, ...defaults });
  confetti({ particleCount: 160, startVelocity: 25, origin: { y: 0.6 }, ...defaults });
}

// Typewriter
function typewriter(el, text, speed=24) {
  el.innerHTML = "";
  let i = 0;
  const timer = setInterval(() => {
    el.innerHTML += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// Hearts click particles
function spawnHeart(x, y) {
  const layer = document.getElementById("heart-layer");
  const span = document.createElement("span");
  span.className = "click-heart";
  span.textContent = ["💗","💖","💘","💝"][Math.floor(Math.random()*4)];
  span.style.left = x + "px";
  span.style.top = y + "px";
  layer.appendChild(span);
  setTimeout(() => span.remove(), 1000);
}

// Floating balloons
function launchBalloons() {
  const layer = document.getElementById("balloon-layer");
  if (!layer) return;
  const colors = ["#ffa7d1","#ffd166","#9bf6ff","#bdb2ff","#caffbf","#ffadad"];
  const b = document.createElement("div");
  b.className = "balloon";
  const left = Math.random()*100;
  const duration = 10 + Math.random()*8;
  b.style.left = left + "vw";
  b.style.animationDuration = duration + "s";
  b.style.setProperty("--balloon", colors[Math.floor(Math.random()*colors.length)]);
  layer.appendChild(b);
  setTimeout(() => b.remove(), (duration+1)*1000);
}

document.addEventListener("click", (e) => {
  spawnHeart(e.clientX, e.clientY);
});




document.addEventListener("DOMContentLoaded", () => {
  // Buttons
  const confettiBtn = document.getElementById("confettiBtn");
  if (confettiBtn) confettiBtn.addEventListener("click", burstConfetti);

  // Typewriter
  const typeEl = document.getElementById("typewriter");
  if (typeEl) {
    const original = typeEl.textContent.trim();
    typewriter(typeEl, original);
    const retype = document.getElementById("retype");
    retype && retype.addEventListener("click", () => typewriter(typeEl, original));
  }

  // Hearts button
  const heartsBtn = document.getElementById("hearts");
  if (heartsBtn) heartsBtn.addEventListener("click", () => {
    for (let i=0;i<18;i++) {
      setTimeout(() => spawnHeart(window.innerWidth*Math.random(), window.innerHeight*(.4 + Math.random()*.5)), i*60);
    }
  });

  // Wish meter
  const meterFill = document.getElementById("meterFill");
  const meterText = document.getElementById("meterText");
  const boost = document.getElementById("boost");
  let percent = 0;
  if (boost) {
    boost.addEventListener("click", () => {
      percent = Math.min(100, percent + 10 + Math.floor(Math.random()*10));
      meterFill.style.width = percent + "%";
      meterText.textContent = percent + "%";
      if (percent >= 100) {
        meterText.textContent = "MAX 💯";
        burstConfetti();
      }
    });
  }

  // Music
  const musicBtn = document.getElementById("musicBtn");
  const audio = document.getElementById("song");
  if (musicBtn && audio) {
    let playing = false;
    musicBtn.addEventListener("click", async () => {
      try {
        if (!playing) {
          await audio.play();
          musicBtn.textContent = "Pause Music ❚❚";
          playing = true;
        } else {
          audio.pause();
          musicBtn.textContent = "Play Music ♪";
          playing = false;
        }
      } catch (e) {
        alert("Add your song at static/audio/birthday_song.mp3 to enable music 🎵");
      }
    });
  }

  
  // Memory video controls
  const memoryVideo = document.getElementById("memoryVideo");
  const playMemory = document.getElementById("playMemory");
  const confettiMemory = document.getElementById("confettiMemory");
  if (memoryVideo && playMemory) {
    playMemory.addEventListener("click", async () => {
      try {
        await memoryVideo.play();
      } catch(e) {
        alert("Add your video at static/video/memory.mp4 to play the memory 🎬");
      }
    });
  }
  if (confettiMemory) confettiMemory.addEventListener("click", burstConfetti);

  // Balloon loop
  setInterval(launchBalloons, 600);

  // Floating love quotes + surprise toast popups
const QUOTES = [
  "Forever yours 💞",
  "You are my favorite chapter 📖",
  "With you, every day is special ✨",
  "My heart chose you, again and again ❤️",
  "Husband, best friend, my everything 💍",
  "I love you to the moon & back 🌙",
  "You are my home 🏡",
  "More laughs, more love, more us 💖",
  "You + Me = Always ♾️",
  "Thank you for being you 💗"
];

function spawnQuote() {
  const layer = document.getElementById("quotes-layer");
  if (!layer) return;
  const span = document.createElement("span");
  span.className = "quote-float";
  span.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const x = 12 + Math.random() * 76;  // avoid edges
  const y = 70 + Math.random() * 20;  // start lower
  span.style.left = x + "vw";
  span.style.top  = y + "vh";
  layer.appendChild(span);
  setTimeout(() => span.remove(), 12000);
}

// Surprise toast
const TOASTS = [
  ["I love you, Suhail!", "From your forever person 💖"],
  ["Happy Birthday, my husband!", "Let’s make a million memories 🎉"],
  ["You make my world brighter ✨", "Today & always"],
  ["Cakes are sweet. You’re sweeter 🎂", "…and way cuter 😘"],
  ["Here’s to us 🥂", "Now and forever"]
];
let toastTimer;
function showToast() {
  const t = document.getElementById("toast");
  if (!t) return;
  const [title, sub] = TOASTS[Math.floor(Math.random()*TOASTS.length)];
  t.innerHTML = `${title}<span class="tiny">${sub}</span>`;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

// schedule
setInterval(spawnQuote, 9000);           // float a new quote every 9s
setTimeout(() => spawnQuote(), 2000);    // start one quickly
setInterval(showToast, 25000 + Math.floor(Math.random()*15000)); // 25–40s

// Friends wishes: open modal and play the selected video
const wishModal   = document.getElementById("wishModal");
const wishPlayer  = document.getElementById("wishPlayer");
const wishTitleEl = document.getElementById("wishTitle");

function openWish(name, src) {
  // Reset player
  wishPlayer.pause();
  wishPlayer.removeAttribute("src");
  while (wishPlayer.firstChild) wishPlayer.removeChild(wishPlayer.firstChild);

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  wishPlayer.appendChild(source);

  wishTitleEl.textContent = `${name} — their birthday wish 🎥`;
  wishModal.hidden = false;

  wishPlayer.load();
  wishPlayer.play().catch(() => {
    alert("I couldn't play this file. Make sure it exists at: " + src);
  });
}

function closeWish() {
  wishPlayer.pause();
  wishModal.hidden = true;
}

// Attach click handlers
document.querySelectorAll(".friend-card").forEach(btn => {
  btn.addEventListener("click", () => openWish(btn.dataset.friend, btn.dataset.src));
});

// Close modal on backdrop, X button, or Esc
wishModal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeWish();
});
document.addEventListener("keydown", (e) => {
  if (!wishModal.hidden && e.key === "Escape") closeWish();
});



});
