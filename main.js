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
    console.log(keysDown);
  });
  document.addEventListener("keyup", (e) => {
    delete keysDown[e.key];
    console.log(keysDown);
  });
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
};
const renderImg = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceship, spaceshipX, spaceshipY);
};

const main = () => {
  update();
  renderImg();
  console.log("render image");
  requestAnimationFrame(main);
};

loadImg();
keyboardListener();
main();
