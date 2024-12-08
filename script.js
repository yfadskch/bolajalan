document.getElementById('startButton').addEventListener('click', function() {
    const funnelContainer = document.getElementById('funnelContainer');
    funnelContainer.innerHTML = ''; // Clear previous balls if any

    const width = funnelContainer.clientWidth;
    const height = funnelContainer.clientHeight;

    for (let i = 0; i < 8; i++) {
        let ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.background = `hsl(${i * 45}, 100%, 50%)`; // Colorful balls
        ball.style.left = `${width / 2 - 10}px`; // Start from center
        ball.style.top = '10px';
        funnelContainer.appendChild(ball);

        // Calculate end position dynamically
        let endX = (i - 3.5) * (width / 14); // Adjust end position spread
        let pathY = height - (Math.abs(i - 3.5) * 30); // Lower height for balls farther from center

        // Animate the ball
        ball.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${endX}px, ${pathY}px)` }
        ], {
            duration: 4000 + Math.random() * 1000,  // Randomized duration for natural effect
            fill: 'forwards',
            easing: 'ease-in-out'
        });
    }
});
