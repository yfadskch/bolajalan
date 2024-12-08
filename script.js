document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("galtonCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");

  canvas.width = 800;
  canvas.height = 600;

  const rows = 10;
  const cols = 15;
  const radius = 5;
  const padding = 10;

  const balls = [];
  const gravity = 0.5;

  // Draw pegs
  function drawPegs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const startX = canvas.width / 2 - (cols * (radius + padding)) / 2;
    const startY = 50;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const x = startX + col * (2 * radius + padding) + (row * (radius + padding)) / 2;
        const y = startY + row * (2 * radius + padding);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  // Ball object
  function createBall() {
    return {
      x: canvas.width / 2,
      y: 0,
      radius: 8,
      dx: (Math.random() - 0.5) * 2,
      dy: 2,
      color: "yellow",
    };
  }

  function updateBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPegs();

    balls.forEach((ball, index) => {
      // Update ball position
      ball.dy += gravity;
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Collision with bottom
      if (ball.y + ball.radius >= canvas.height) {
        balls.splice(index, 1); // Remove ball when it hits the bottom
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });

    if (balls.length > 0) {
      requestAnimationFrame(updateBalls);
    }
  }

  startButton.addEventListener("click", () => {
    balls.push(createBall());
    if (balls.length === 1) {
      updateBalls();
    }
  });

  drawPegs();
});
