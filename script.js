// ================= COUNTDOWN SAFE =================

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");
const hintEl = document.getElementById("countHint");

const targetDate = new Date("April 15, 2026 14:00:00").getTime();

function tick(){
  if (!dEl || !hEl || !mEl || !sEl) return;

  const now = Date.now();
  let diff = targetDate - now;

  if(diff <= 0){
    dEl.textContent = "0";
    hEl.textContent = "0";
    mEl.textContent = "0";
    sEl.textContent = "0";
    if (hintEl) hintEl.textContent = "🌸 Боллоо! 💗";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);
  const secs = Math.floor(diff / 1000);

  dEl.textContent = days;
  hEl.textContent = String(hours).padStart(2,"0");
  mEl.textContent = String(mins).padStart(2,"0");
  sEl.textContent = String(secs).padStart(2,"0");
}

tick();
setInterval(tick, 1000);


// ================= LETTER UNLOCK SAFE =================

const unlockBtn = document.getElementById("unlockBtn");
const answer = document.getElementById("answer");
const letterBox = document.getElementById("letterBox");
const unlockStatus = document.getElementById("unlockStatus");

const CORRECT = "gomo bas hairtai";

if (unlockBtn && answer && letterBox && unlockStatus) {
  unlockBtn.addEventListener("click", () => {

    const v = answer.value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    if (v === CORRECT) {
      letterBox.classList.remove("locked");
      unlockStatus.textContent = "💗 chi gomo ym bnshde ";
      unlockStatus.style.color = "hotpink";
    } else {
      unlockStatus.textContent = " **** bas ******* gomo gdgee helchihee";
      unlockStatus.style.color = "gray";
    }
  });
}


// ================= GENERIC PAGE PASSWORDS =================

function setupSimpleUnlock(btnId, inputId, contentId, statusId, correct) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  const content = document.getElementById(contentId);
  const status = document.getElementById(statusId);
  if (btn && input && content && status) {
    btn.addEventListener("click", () => {
      const v = input.value.toLowerCase().trim();
      if (v === correct) {
        content.classList.remove("locked");
        status.textContent = "💗 aanhn chi gomo";
        status.style.color = "hotpink";
      } else {
        status.textContent = "zov sanaarai banida";
        status.style.color = "gray";
      }
    });
  }
}

// passwords for specific pages (customize as desired)
// memories password: answer to riddle (month.day when we returned from olympiad)
setupSimpleUnlock('memUnlockBtn','memPass','memContent','memUnlockStatus','9.28');
// coupon password: simple affirmative
setupSimpleUnlock('couponUnlockBtn','couponPass','couponContent','couponUnlockStatus','tiim');
// final page riddle answer: 1–10, correct is 10
setupSimpleUnlock('finalUnlockBtn','finalPass','finalBox','finalStatus','10');
// video page unlock password (changed per user request)
setupSimpleUnlock('videoUnlockBtn','videoPass','videoBox','videoStatus','12.31');


// ================= MINI GAME SAFE =================

const spawnBtn = document.getElementById("spawnBtn");
const playground = document.getElementById("playground");
const scoreSpan = document.getElementById("score");
const gameStatus = document.getElementById("gameStatus");
const finalBox = document.getElementById("finalBox");

let score = 0;

if (spawnBtn && playground && scoreSpan) {

  spawnBtn.addEventListener("click", () => {

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💗";

    const x = Math.random() * (playground.clientWidth - 40) + 20;
    const y = Math.random() * (playground.clientHeight - 40) + 20;

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.addEventListener("click", (e) => {
      e.stopPropagation();
      score++;
      scoreSpan.textContent = score;
      heart.remove();

      if(score >= 10 && finalBox){
        finalBox.classList.remove("locked");
        if (gameStatus)
          gameStatus.textContent = "🎉 Final unlock болсон! 💗";
      }
    });

    playground.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  });

}