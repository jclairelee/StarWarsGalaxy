// Canvas set-up
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
//canvas size 400px X 700px
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

//Load Images
let bgImg,
  galaxyBG,
  spaceship,
  spacecraft,
  spacecraft1,
  spacecraft2,
  spacecraft3,
  spacecraft4,
  gameOverImg,
  bullet;

let spaceshipX = canvas.width / 2 - 48;
let spaceshipY = canvas.height - 48;

let bulletList = [];
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.reset = () => {
    this.x = spaceshipX + 20;
    this.y = spaceshipY - 10;
  };
  this.update = () => {
    this.y -= 8;
  };
  bulletList.push(this);
}
const loadImg = () => {
  bgImg = new Image();
  bgImg.src = "image/galaxyBG.png";

  bullet = new Image();
  bullet.src = "/image/bullet.png";

  spaceship = new Image();
  spaceship.src = "image/myShip.png";

  gameOverImg = new Image();
  gameOverImg.src = "image/gameOver.jpeg";

  spacecraft = new Image();
  spacecraft.src = "image/spacecraft.png";

  spacecraft1 = new Image();
  spacecraft1.src = "image/spacecraft1.png";

  spacecraft2 = new Image();
  spacecraft2.src = "image/spacecraft2.png";

  spacecraft3 = new Image();
  spacecraft3.src = "image/spacecraft3.png";

  spacecraft4 = new Image();
  spacecraft4.src = "image/spacecraft4.png";
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
      fireBullet();
    }
    console.log(bulletList);
  });
};

const fireBullet = () => {
  console.log("bulletsout");
  const b = new Bullet();
  b.reset();
};
const update = () => {
  if ("ArrowRight" in keysDown) {
    //right
    spaceshipX += 6;
  }
  if ("ArrowLeft" in keysDown) {
    //left
    spaceshipX -= 6;
  }
  if ("ArrowUp" in keysDown) {
    //Up
    spaceshipY -= 6;
  }
  if ("ArrowDown" in keysDown) {
    //down
    spaceshipY += 6;
  }

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 48) {
    spaceshipX = canvas.width - 48;
  }
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
};
const renderImg = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceship, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bullet, bulletList[i].x, bulletList[i].y);
  }
};

const main = () => {
  update();
  renderImg();
  requestAnimationFrame(main);
};

loadImg();
keyboardListener();
main();
