const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;

let ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 10,
  dy: 0, // 初始速度为 0
  falling: false, // 控制是否开始落体
};

const obstacles = [];
const rows = 6;
const cols = 7;
const offset = 80;

// 生成反漏斗形的障碍物
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols - i; j++) {
    obstacles.push({
      x: 100 + j * offset + (i * offset) / 2,
      y: 200 + i * offset,
      radius: 15,
    });
  }
}

// 绘制球体
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// 绘制障碍物
function drawObstacles() {
  obstacles.forEach((obs) => {
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  });
}

// 更新球体位置
function updateBall() {
  if (ball.falling) {
    ball.dy = 2; // 自由落体速度
    ball.y += ball.dy;

    // 检测碰撞
    obstacles.forEach((obs) => {
      const dist = Math.hypot(ball.x - obs.x, ball.y - obs.y);
      if (dist < ball.radius + obs.radius) {
        ball.x += Math.random() < 0.5 ? -30 : 30; // 碰到障碍物时随机偏移
      }
    });

    // 到达底部后重置
    if (ball.y > canvas.height) {
      ball.falling = false;
      ball.y = 50;
      ball.x = Math.random() * canvas.width; // 随机生成新位置
    }
  }
}

// 绘制场景
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawObstacles();
  updateBall();
  requestAnimationFrame(draw);
}

// 点击按钮开始游戏
document.getElementById("startButton").addEventListener("click", () => {
  ball.falling = true;
  ball.x = Math.random() * canvas.width; // 随机起始位置
  ball.y = 50;
});

// 启动游戏循环
draw();
