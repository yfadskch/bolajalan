document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    const funnelContainer = document.getElementById('funnelContainer');
    funnelContainer.innerHTML = ''; // Clear previous balls if any

    // Create a ball at a random position at the top
    let ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.left = `${Math.random() * (768 - 20)}px`; // random position within the container width minus ball width
    ball.style.top = '10px'; // start from top
    funnelContainer.appendChild(ball);

    // Animate the ball falling
    let interval = setInterval(() => {
        let currentTop = parseInt(ball.style.top, 10);
        ball.style.top = `${currentTop + 5}px`; // Move down 5px at a time

        // Stop the ball if it reaches the bottom of the container
        if (currentTop >= 1345) {
            clearInterval(interval);
        }
    }, 50);
}
