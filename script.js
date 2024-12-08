const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

const gravity = 0.2;

// 球对象
let ball = {
  x: Math.random() * canvas.width,
  y: 50,
  radius: 10,
  color: "red",
  velocityX: 0,
  velocityY: 2,
};

// 黑球（阻拦物）和条线（边界障碍）的数据
const obstacles = [
  { x: 100, y: 100, radius: 15 }, // 示例黑球
  { x: 200, y: 200, radius: 15 },
  { x: 300, y: 300, radius: 15 },
];

const boundaries = [
  { x1: 50, y1: 500, x2: 350, y2: 500 }, // 示例底部条线
  { x1: 50, y1: 500, x2: 50, y2: 100 },  // 左侧条线
  { x1: 350, y1: 500, x2: 350, y2: 100 } // 右侧条线
];

// 重置球的初始位置
function resetBall() {
  ball.x = Math.random() * canvas.width;
  ball.y = 50;
  ball.velocityX = 0;
  ball.velocityY = 2;
}

// 绘制球
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// 绘制黑球
function drawObstacles() {
  obstacles.forEach((obs) => {
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  });
}

// 绘制边界
function drawBoundaries() {
  boundaries.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  });
}

// 检测球与黑球的碰撞
function detectObstacleCollision(ball, obstacle) {
  const dx = ball.x - obstacle.x;
  const dy = ball.y - obstacle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball.radius + obstacle.radius;
}

// 检测球与边界的碰撞
function detectBoundaryCollision(ball, line) {
  const { x1, y1, x2, y2 } = line;

  // 点到直线距离公式
  const A = ball.y - y1;
  const B = x1 - ball.x;
  const C = y1 * (x2 - x1) - x1 * (y2 - y1);
  const dist = Math.abs(A * x2 + B * y2 + C) / Math.sqrt(A * A + B * B);

  return dist <= ball.radius;
}

// 更新球的位置
function updateBall() {
  ball.velocityY += gravity; // 重力加速度
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // 与画布边界碰撞
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.velocityX = -ball.velocityX;
  }

  if (ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // 检测与黑球的碰撞
  obstacles.forEach((obs) => {
    if (detectObstacleCollision(ball, obs)) {
      ball.velocityY = -ball.velocityY * 0.8; // 碰撞后反弹并减速
      ball.velocityX += Math.random() * 2 - 1; // 水平加一点随机性
    }
  });

  // 检测与边界的碰撞
  boundaries.forEach((line) => {
    if (detectBoundaryCollision(ball, line)) {
      ball.velocityY = -ball.velocityY * 0.8;
    }
  });

  // 掉出画布时重置
  if (ball.y - ball.radius > canvas.height) {
    resetBall();
  }
}

// 动画主循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawObstacles();
  drawBoundaries();
  updateBall();

  requestAnimationFrame(animate);
}

// 开始按钮功能
document.getElementById("startButton").addEventListener("click", () => {
  resetBall();
  animate();
});
