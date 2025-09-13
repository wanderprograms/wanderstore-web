const car = document.getElementById("car");
const obstacles = document.getElementById("obstacles");
const gameOver = document.getElementById("gameOver");
const scoreBoard = document.getElementById("scoreBoard");
const background = document.getElementById("background");
const levelPopup = document.getElementById("levelPopup");

const boostSound = document.getElementById("boostSound");
const crashSound = document.getElementById("crashSound");
const levelSound = document.getElementById("levelSound");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

function toggleMute() {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    muteBtn.textContent = "🔇 Mute";
  } else {
    bgMusic.muted = true;
    muteBtn.textContent = "🔊 Unmute";
  }
}

let carX = window.innerWidth / 2 - 40;
let carY = 20;
let score = parseInt(localStorage.getItem("wanderScore")) || 0;
let isGameOver = false;
let speed = 5;

scoreBoard.textContent = "Score: " + score;
car.style.left = carX + "px";
car.style.bottom = carY + "px";

// ✅ Continuous movement control
let moveDirection = null;
let moveInterval = null;

function startMoving(direction) {
  moveDirection = direction;
  moveInterval = setInterval(() => {
    move(moveDirection);
  }, 100);
}

function stopMoving() {
  clearInterval(moveInterval);
  moveDirection = null;
}

// Keyboard movement
document.addEventListener("keydown", (e) => {
  if (isGameOver) return;
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
});
 document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("contextmenu", e => e.preventDefault());
});

// Movement logic
function move(direction) {
  if (isGameOver) return;

  const carWidth = car.offsetWidth;
  const carHeight = car.offsetHeight;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (direction === "left" && carX > 0) {
    carX -= 20;
  }
  if (direction === "right" && carX < screenWidth - carWidth) {
    carX += 20;
  }
  if (direction === "up" && carY < screenHeight - carHeight - 20) {
    carY += 20;
  }
  if (direction === "down" && carY > 0) {
    carY -= 20;
  }

  car.style.left = carX + "px";
  car.style.bottom = carY + "px";
}

// Pause game
function pauseGame() {
  if (!isGameOver) {
    isGameOver = true;
    gameOver.textContent = "⏸️ Paused";
    gameOver.style.display = "block";
  } else {
    isGameOver = false;
    gameOver.style.display = "none";
  }
}

// Create obstacle
function createObstacle() {
  const obs = document.createElement("img");
  const images = [
    "images/tax2.jpeg",
    "images/vane.jpg",
    "images/zex2.jpeg",
    "images/zex1.jpeg"
  ];
  obs.src = images[Math.floor(Math.random() * images.length)];
  obs.style.left = Math.random() * (window.innerWidth - 60) + "px";
  obs.style.top = "-60px";
  obstacles.appendChild(obs);
}

// Move obstacles
function moveObstacles() {
  const obsList = obstacles.querySelectorAll("img");
  obsList.forEach(obs => {
    let top = parseInt(obs.style.top);
    top += speed;
    obs.style.top = top + "px";

    const carRect = car.getBoundingClientRect();
    const obsRect = obs.getBoundingClientRect();

    const overlapX = carRect.left < obsRect.right && carRect.right > obsRect.left;
    const overlapY = carRect.top < obsRect.bottom && carRect.bottom > obsRect.top;

    if (overlapX && overlapY) {
      const intersectWidth = Math.min(carRect.right, obsRect.right) - Math.max(carRect.left, obsRect.left);
      const intersectHeight = Math.min(carRect.bottom, obsRect.bottom) - Math.max(carRect.top, obsRect.top);
      const intersectArea = intersectWidth * intersectHeight;
      const carArea = carRect.width * carRect.height;

      if (intersectArea > carArea * 0.2) {
        crashSound.play();
        gameOver.style.display = "block";
        isGameOver = true;
      }
    }

    if (top > window.innerHeight) {
      obs.remove();
      score++;
      scoreBoard.textContent = "Score: " + score;
      localStorage.setItem("wanderScore", score);

      if (score === 10) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 2: Desert Speed!");
      }
      if (score === 20) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 3: Mountain Rush!");
      }
      if (score === 30) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 4: Desert Speed!");
      }
      if (score === 40) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 5: Mountain Rush!");
      }
      if (score === 50) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 6: Desert Speed!");
      }
      if (score === 60) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 7: Mountain Rush!");
      }
      if (score === 70) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 8: Desert Speed!");
      }
      if (score === 80) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 9: Mountain Rush!");
      }
      if (score === 90) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/motor1.jpeg";
        levelSound.play();
        showLevelPopup("Level 10: Mountain Rush!");
      }
      if (score === 100) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 11: Desert Speed!");
      }
      if (score === 110) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 12: Mountain Rush!");
      }
      if (score === 120) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 13: Desert Speed!");
      }
      if (score === 130) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 14: Mountain Rush!");
      }
      if (score === 140) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 15: Desert Speed!");
      }
      if (score === 150) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 16: Mountain Rush!");
      }
        if (score === 160) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 17: Mountain Rush!");
      }
      if (score === 170) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 18: Desert Speed!");
      }
      if (score === 180) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 19: Mountain Rush!");
      }
      if (score === 190) {
        background.src = "images/desertRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 20: Desert Speed!");
      }
      if (score === 200) {
        background.src = "images/cityRoad.jpg";
        car.src = "images/tax1.jpeg";
        levelSound.play();
        showLevelPopup("Level 21: Mountain Rush!");
      }
    }
  });
}

// Show level popup
function showLevelPopup(text) {
  clickSound.play();
  levelPopup.textContent = text;
  levelPopup.style.display = "block";
  setTimeout(() => {
    levelPopup.style.display = "none";
  }, 3000);
}

// Boost speed
function boostSpeed() {
  speed += 2;
  boostSound.play();
  showLevelPopup("⚡ Speed Boost!");
}

// Reset game
function resetGame() {
  location.reload();
}

// Reset score
function resetScore() {
  localStorage.setItem("wanderScore", "0");
  score = 0;
  scoreBoard.textContent = "Score: 0";
  showLevelPopup("🧹 Score Cleared!");
}

// Show info modal
function showInfo() {
  document.getElementById("infoModal").style.display = "block";
}

// Hide info modal
function hideInfo() {
  document.getElementById("infoModal").style.display = "none";
}

// Game loop
setInterval(() => {
  if (!isGameOver) createObstacle();
}, 1500);

setInterval(() => {
  if (!isGameOver) moveObstacles();
}, 50);