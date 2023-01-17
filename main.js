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
  spacecraft,
  spacecraft1,
  spacecraft2,
  spacecraft3,
  spacecraft4,
  gameOverImg,
  bullet;

const loadImg = () => {
  bgImg = new Image();
  bgImg.src = "image/galaxyBG.webp";

  bullet = new Image();
  bullet.src = "image/bullet.png";

  spaceshipImg = new Image();
  spaceshipImg.src = "image/myShip.png";

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
