// Canvas set-up
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

//canvas size
canvas.width = 1000;
canvas.height = 800;

document.body.appendChild(canvas);

//Load Images
let bgImg, spaceship, spacecraft2, gameOverImg, bullet;
let gameOver = false;
let score = 0;
let spaceshipX = canvas.width / 2 - 48;
let spaceshipY = canvas.height - 48;
let bgSound = new Audio("/sound/starWarsSong.mp3");
let shootingSound = new Audio("/sound/spaceshipShooting.mp3");

let bulletList = [];
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.reset = () => {
    this.x = spaceshipX + 27;
    this.y = spaceshipY - 10;
    this.alive = true; //bullet status
    bulletList.push(this);
  };
  this.update = () => {
    this.y -= 8;
  };

  this.checkDamage = () => {
    for (i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 49
      ) {
        score += 1;
        this.alive = false;
        enemyList.splice(i, 1);
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
  this.reset = () => {
    this.y = 0;
    this.x = randomLocation(0, canvas.width - 48);
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

//keysPressed contains the kyes that user pressed
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
  const b = new Bullet();
  b.reset();
};

const makeEnemy = () => {
  const interval = setInterval(function () {
    let newE = new Enemy();
    newE.reset();
  }, 1000);
};

const update = () => {
  if ("ArrowRight" in keysDown) {
    spaceshipX += 6;
  }
  if ("ArrowLeft" in keysDown) {
    spaceshipX -= 6;
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
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceship, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`, 20, 40);
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
const playBGM = () => {
  if (!gameOver) {
    bgSound.play();
  }
};
const main = () => {
  if (!gameOver) {
    update();
    renderImg();
    playBGM();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImg, 100, 250, 800, 320);
    bgSound.pause();
  }
};

playBGM();
loadImg();
keyboardListener();
makeEnemy();
main();
