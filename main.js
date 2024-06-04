// Canvas setup
let canvas;
let ctx;

function setupCanvas() {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
});

// Initialize canvas
setupCanvas();

let currentLevel;
const levelConfig = {
  easy: { enemySpeed: 1, baseInterval: 1800 },
  medium: { enemySpeed: 2, baseInterval: 1300 },
  hard: { enemySpeed: 3, baseInterval: 1000 },
};

function createLevelButtons() {
  const levels = ["easy", "medium", "hard"];
  const btnBox = document.createElement("div");
  btnBox.className = "levelBtns";
  const levelTitle = document.createElement("h2");
  levelTitle.className = "levelTitle";
  levelTitle.innerText = "SELECT LEVEL";
  btnBox.appendChild(levelTitle);
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.className = level;
    button.innerHTML = level.charAt(0).toUpperCase() + level.slice(1);

    button.addEventListener("click", () => {
      setLevel(level);
    });
    btnBox.appendChild(button);
  });
  document.body.appendChild(btnBox);
}

function setLevel(level) {
  console.log(`Selected level: ${level}`);
  currentLevel = level;
  const btnBox = document.querySelector(".levelBtns");
  btnBox.remove();

  startGame();
}

let bgImg, spaceship, spacecraft2, gameOverImg, bullet;
let gameOver = false;
let score = 0;
let spaceshipX = canvas.width / 2 - 48;
let spaceshipY = canvas.height - 48;
let bgSound = new Audio("/sound/starWarsSong.mp3");
let shootingSound = new Audio("/sound/spaceshipShooting.mp3");
let enemiesKilled = 0;
let bulletList = [];

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.alive = false;
  }

  reset() {
    this.x = spaceshipX + 27;
    this.y = spaceshipY - 10;
    this.alive = true;
    bulletList.push(this);
  }

  update() {
    this.y -= 8;
  }

  checkDamage() {
    for (let i = 0; i < enemyList.length; i++) {
      const enemy = enemyList[i];
      if (
        this.y <= enemy.y &&
        this.x >= enemy.x &&
        this.x <= enemy.x + 49 &&
        !enemy.hit
      ) {
        score += 5;
        this.alive = false;
        enemy.hit = true;
        enemyList.splice(i, 1);
        enemiesKilled++;
        console.log("Number of enemies killed: ", enemiesKilled);
      }
    }
  }
}

class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.hit = false;
  }

  reset() {
    this.y = 0;
    this.x = randomLocation(0, canvas.width - 48);
    this.hit = false;
    enemyList.push(this);
  }

  update() {
    this.y += levelConfig[currentLevel].enemySpeed;

    if (this.y >= canvas.height - 48) {
      gameOver = true;
    }
    if (
      spaceshipX < this.x + 48 &&
      spaceshipX + 48 > this.x &&
      spaceshipY < this.y + 48 &&
      spaceshipY + 48 > this.y
    ) {
      gameOver = true;
    }
  }
}

const randomLocation = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let enemyList = [];

const loadImages = () => {
  bgImg = new Image();
  bgImg.src = "image/background.jpg";

  bullet = new Image();
  bullet.src = "/image/bullet.png";

  spaceship = new Image();
  spaceship.src = "image/myShip.png";

  gameOverImg = new Image();
  gameOverImg.src = "image/gameOver.jpg";

  spacecraft2 = new Image();
  spacecraft2.src = "image/enemy.png";
};

let keysDown = {};

const keyboardListener = () => {
  document.addEventListener("keydown", (e) => {
    keysDown[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    delete keysDown[e.key];
    if (e.key === " ") {
      shootingSound.play();
      shootingSound.playbackRate = 3.5;
      fireBullet();
    }
  });
};

const fireBullet = () => {
  const newBullet = new Bullet();
  newBullet.reset();
};

const makeEnemy = () => {
  if (currentLevel && levelConfig[currentLevel]) {
    const { baseInterval } = levelConfig[currentLevel];
    let spawnInterval = baseInterval || 1200;

    setInterval(() => {
      const newE = new Enemy();
      newE.reset();
      if (enemiesKilled % 10 === 0) {
        spawnInterval = Math.max(500, spawnInterval - 100);
      }
    }, spawnInterval);
  }
};

const handleGameUpdate = () => {
  if ("ArrowRight" in keysDown) {
    spaceshipX += 8;
  }
  if ("ArrowLeft" in keysDown) {
    spaceshipX -= 8;
  }
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 48) {
    spaceshipX = canvas.width - 48;
  }
  if ("ArrowUp" in keysDown) {
    if (spaceshipY > canvas.height / 1.3) {
      spaceshipY -= 8;
    }
  }
  if ("ArrowDown" in keysDown) {
    spaceshipY += 8;
  }

  if (spaceshipY <= 0) {
    spaceshipY = 0;
  }
  if (spaceshipY >= canvas.height - 48) {
    spaceshipY = canvas.height - 48;
  }
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkDamage();
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
};

const renderImages = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceship, spaceshipX, spaceshipY);
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.fillText(`Level: ${currentLevel}`, canvas.width - 200, 40);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bullet, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(spacecraft2, enemyList[i].x, enemyList[i].y);
  }
};

const playBackgroundMusic = () => {
  if (!gameOver) {
    bgSound.play();
  }
};

const mainLoop = () => {
  const x = (canvas.width - 800) / 2;

  if (!gameOver) {
    handleGameUpdate();
    renderImages();
    playBackgroundMusic();
    requestAnimationFrame(mainLoop);
  } else {
    ctx.drawImage(gameOverImg, x, 250, 800, 320);
    bgSound.pause();
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      location.reload();
    }, 1000);
  }
};

function startGame() {
  playBackgroundMusic();
  loadImages();
  keyboardListener();
  makeEnemy();
  mainLoop();
}

function initializeGame() {
  createLevelButtons();
  loadImages();
}

initializeGame();
