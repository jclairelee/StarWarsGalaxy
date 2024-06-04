// Canvas setup
let canvas;
let ctx;

function setupCanvas() {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  resizeCanvas();
  return { canvas, ctx };
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
// Level configurations
const levelConfig = {
  easy: { enemySpeed: 1, baseInterval: 1800 },
  medium: { enemySpeed: 2, baseInterval: 1250 },
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

  enemySpeed = levelConfig[level].enemySpeed;
  baseInterval = levelConfig[level].baseInterval;

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

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.reset = () => {
    this.x = spaceshipX + 27;
    this.y = spaceshipY - 10;
    //bullet status
    this.alive = true;
    bulletList.push(this);
  };

  this.update = () => {
    this.y -= 8;
  };

  this.checkDamage = () => {
    for (i = 0; i < enemyList.length; i++) {
      const enemy = enemyList[i];
      if (
        //checking for a collision between the bullet and an enemy.
        this.y <= enemy.y && //Checks if the bullet's vertical position is at or above the enemy's vertical position.
        this.x >= enemy.x && //Checks if the bullet's horizontal position is to the right of the enemy's horizontal position.
        this.x <= enemy.x + 49 && //Checks if the bullet's horizontal position is within the width of the enemy
        !enemy.hit
      ) {
        score += 5;
        this.alive = false;
        enemy.hit - true;
        enemyList.splice(i, 1);
        enemiesKilled++;
        console.log("number of enermiesKilled: ", enemiesKilled);
      }
    }
  };
}

const randomLocation = (min, max) => {
  const random = Math.floor(Math.random() * (max - min + 1));
  return random;
};

let enemyList = [];

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.hit = false; // New property to track whether the enemy has been hit

  this.reset = () => {
    this.y = 0;
    this.x = randomLocation(0, canvas.width - 48);
    this.hit = false; // Reset the hit status when resetting the enemy
    enemyList.push(this);
  };

  this.update = () => {
    this.y += 3;

    if (this.y >= canvas.height - 48) {
      gameOver = true;
    }
  };
}

const loadImg = () => {
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

let keysDown = {}; // Object to track pressed keys

const keyboardListener = () => {
  document.addEventListener("keydown", (e) => {
    keysDown[e.key] = true; // Set the corresponding key as true in the keysDown object
  });

  // Listen for keyup event
  document.addEventListener("keyup", (e) => {
    delete keysDown[e.key]; // Remove the corresponding key from keysDown object when released

    // If the spacebar is pressed, play a shooting sound, adjust the playback rate, and fire a bullet
    if (e.key === " ") {
      shootingSound.play();
      shootingSound.playbackRate = 3.5;
      fireBullet(); // Assume there's a function called fireBullet() to handle shooting
    }
  });
};

const fireBullet = () => {
  const newBullet = new Bullet();
  newBullet.reset();
};

const makeEnemy = () => {
  if (currentLevel && levelConfig[currentLevel]) {
    const { enemySpeed, baseInterval } = levelConfig[currentLevel];
    const spawnInterval = baseInterval || 1200;

    const interval = setInterval(function () {
      let newE = new Enemy();
      newE.reset();

      // Check if a certain number of enemies have been killed to increase the spawn rate
      if (enemiesKilled % 10 === 0) {
        spawnInterval = Math.max(500, spawnInterval - 100); // Decrease spawn interval by 100 milliseconds
      }
    }, spawnInterval);
    console.log(spawnInterval);
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
const renderImg = () => {
  // Render background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  //Render Player Spaceship
  ctx.drawImage(spaceship, spaceshipX, spaceshipY);

  // Score Display
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.fillText(`Level: ${currentLevel}`, canvas.width - 200, 40);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";

  // Render Bullets
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bullet, bulletList[i].x, bulletList[i].y);
    }
  }
  // Render enemies
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(spacecraft2, enemyList[i].x, enemyList[i].y);
  }
};
const playBGM = () => {
  if (!gameOver) {
    bgSound.play();
  }
};
const main = () => {
  const x = (canvas.width - 800) / 2;

  if (!gameOver) {
    handleGameUpdate();
    renderImg();
    playBGM();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImg, x, 250, 800, 320);
    bgSound.pause();
  }
};
// Start the game
function startGame() {
  playBGM();
  loadImg();
  keyboardListener();
  makeEnemy();
  main();
}

// Initialize the game
function init() {
  createLevelButtons();
  loadImg();
}

init();
