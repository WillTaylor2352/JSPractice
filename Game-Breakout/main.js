document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//alert("this works");

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

window.addEventListener('load', function () {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var interval = setInterval(draw, 10);

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x+=dx;
  y+=dy;
  if(y+dy < ballRadius){
    dy = -dy;
  } else if(y+dy>canvas.height-ballRadius){
    if (x>paddleX && x<paddleX+paddleWidth){
      dy = -dy;
    }
    else{
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }
  if(x+dx < ballRadius || x+dx > canvas.width-ballRadius){
    dx = -dx;
  }
  if(rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
  }else if(leftPressed) {
    paddleX -= 7;
    if (paddleX < 0){
        paddleX = 0;
    }
  }
}


});
