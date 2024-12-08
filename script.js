const canvas = document.getElementById("galtonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const rows = 10;
const cols = 15;
const radius = 5;
const padding = 10;

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

drawPegs();
