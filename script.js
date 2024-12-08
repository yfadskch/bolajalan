const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let ball = {
  x: Math.random() * canvas.width, // Random initial x position
  y: 50,
  radius: 10,
  color: "red",
  velocityX: 0,
  velocityY: 2,
};

let blackObstacles = []; // Store black circles
const gravity = 0.1;

// Create a grid of black obstacles
function initializeObstacles() {
  blackObstacles = [];
  const rows = 10;
  const cols = 10;
  const gap = 35;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * gap + 20;
      const y = i * gap + 50;
      blackObstacles.push({ x, y, radius: 10, color: "black" });
    }
  }
}

// Reset ball position
function resetBall() {
  ball.x = Math.random() * canvas.width;
  ball.y = 50;
  ball.velocityX = 0;
  ball.velocityY = 2;
}

// Detect collision with black objects
function detectCollision(ball, obstacle) {
  const dx = ball.x - obstacle.x;
  const dy = ball.y - obstacle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball.radius + obstacle.radius;
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Draw the black obstacles
function drawObstacles() {
  blackObstacles.forEach((obstacle) => {
    ctx.beginPath();
    ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
    ctx.fillStyle = obstacle.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Update the ball position
function updateBall() {
  ball.velocityY += gravity; // Apply gravity
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Check for collisions with the canvas walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.velocityX = -ball.velocityX;
  }

  // Bounce off black obstacles
  blackObstacles.forEach((obstacle) => {
    if (detectCollision(ball, obstacle)) {
      ball.velocityY = -ball.velocityY * 0.8; // Reverse and dampen velocity
      ball.velocityX += Math.random() * 2 - 1; // Add some horizontal randomness
    }
  });

  // Reset ball if it falls out of canvas
  if (ball.y - ball.radius > canvas.height) {
    resetBall();
  }
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawObstacles();
  drawBall();
  updateBall();

  requestAnimationFrame(animate);
}

// Start button functionality
document.getElementById("startButton").addEventListener("click", () => {
  resetBall();
  initializeObstacles();
  animate();
});

// Initialize obstacles on page load
initializeObstacles();
