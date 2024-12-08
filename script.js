、const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let ball = {
  x: Math.random() * canvas.width,
  y: 50,
  radius: 10,
  color: "red",
  velocityX: 0,
  velocityY: 2,
};

let obstacles = []; // 用于动态生成黑球障碍物
const gravity = 0.2;

// 加载图片
const image = new Image();
image.src = "./images/MAP.png"; // 确保路径正确
image.onload = () => {
  extractObstaclesFromImage(image);
  startSimulation();
};

// 从图片提取障碍物（黑球）的位置
function extractObstaclesFromImage(image) {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = image.width;
  tempCanvas.height = image.height;
  tempCtx.drawImage(image, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const index = (y * image.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      // 如果是黑色像素 (RGB = 0, 0, 0)，生成障碍物
      if (r === 0 && g === 0 && b === 0) {
        const obstacleX = (x / image.width) * canvas.width;
        const obstacleY = (y / image.height) * canvas.height;
        obstacles.push({ x: obstacleX, y: obstacleY, radius: 5 });
      }
    }
  }
}

// 重置小球位置
function resetBall() {
  ball.x = Math.random() * canvas.width;
  ball.y = 50;
  ball.velocityX = 0;
  ball.velocityY = 2;
}

// 绘制小球
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
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

// 更新小球位置
function updateBall() {
  ball.velocityY += gravity; // 添加重力
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // 检测与画布边界的碰撞
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.velocityX = -ball.velocityX;
  }
  if (ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // 检测与障碍物的碰撞
  obstacles.forEach((obs) => {
    const dx = ball.x - obs.x;
    const dy = ball.y - obs.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ball.radius + obs.radius) {
      ball.velocityY = -ball.velocityY * 0.8; // 反弹并减速
      ball.velocityX += Math.random() * 2 - 1; // 添加随机水平速度
    }
  });

  // 小球掉出画布时重置
  if (ball.y - ball.radius > canvas.height) {
    resetBall();
  }
}

// 动画主循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawObstacles();
  updateBall();

  requestAnimationFrame(animate);
}

// 启动模拟
function startSimulation() {
  document.getElementById("startButton").addEventListener("click", () => {
    resetBall();
    animate();
  });
}
