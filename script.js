document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    const funnelContainer = document.getElementById('funnelContainer');
    funnelContainer.innerHTML = ''; // Clear previous game

    // Create obstacles
    for (let i = 0; i < 100; i++) {
        let obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.left = `${Math.random() * (funnelContainer.clientWidth - 25)}px`;
        obstacle.style.top = `${Math.random() * (funnelContainer.clientHeight - 25)}px`;
        funnelContainer.appendChild(obstacle);
    }

    // Create balls
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink'];
    for (let color of colors) {
        let ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.backgroundColor = color;
        ball.style.left = `${funnelContainer.clientWidth / 2 - 10}px`;
        ball.style.top = `10px`;
        funnelContainer.appendChild(ball);

        let interval = setInterval(() => {
            let currentTop = parseInt(ball.style.top);
            let currentLeft = parseInt(ball.style.left);
            let movement = Math.random() > 0.5 ? -1 : 1; // Random left or right step
            ball.style.top = `${currentTop + 20}px`;
            ball.style.left = `${currentLeft + movement * 15}px`;

            if (currentTop > funnelContainer.clientHeight - 20) {
                clearInterval(interval); // Stop the ball if it reaches the bottom
            }
        }, 100);
    }
}
