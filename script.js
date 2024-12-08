const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

let ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 10,
  dx: 0,
  dy: 2,
};

const obstacles = [
  { x: 100, y: 200, type: 1 },
  { x: 200, y: 300, type: 1 },
  { x: 400, y: 400, type: 2 },
  { x: 300, y: 500, type: 1 },
];

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawObstacles() {
  obstacles.forEach((obs) => {
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = obs.type === 1 ? "black" : "blue";
    ctx.fill();
    ctx.closePath();
  });
}

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1; // 碰到左右墙壁反弹
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = 50; // 到底部时重置
  }

  obstacles.forEach((obs) => {
    const dist = Math.hypot(ball.x - obs.x, ball.y - obs.y);
    if (dist < ball.radius + 15) {
      if (obs.type === 1) {
        ball.dy *= -1; // 黑点弹回
      } else if (obs.type === 2) {
        ball.dx = 0;
        ball.dy = 0; // 蓝点阻挡球体
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawObstacles();
  updateBall();
  requestAnimationFrame(draw);
}

draw();
