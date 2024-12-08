document.getElementById('startButton').addEventListener('click', function() {
    const funnelContainer = document.getElementById('funnelContainer');
    funnelContainer.innerHTML = ''; // Clear previous balls if any

    for (let i = 0; i < 8; i++) {
        let ball = document.createElement('div');
        ball.style.width = '20px';
        ball.style.height = '20px';
        ball.style.position = 'absolute';
        ball.style.borderRadius = '50%';
        ball.style.background = `hsl(${i * 45}, 100%, 50%)`; // Colorful balls
        ball.style.left = '50%';
        ball.style.top = '10px';
        ball.style.transform = 'translateX(-50%)';
        funnelContainer.appendChild(ball);

        // Animate the ball
        let angle = Math.random() * 140 - 70; // Random angle for each ball
        let distance = funnelContainer.clientHeight - 30;
        let speed = Math.random() * 3000 + 2000;  // Random speed for each ball
        ball.animate([
            { transform: 'translateX(-50%) translateY(0px)' },
            { transform: `translate(${Math.sin(angle) * 100}px, ${distance}px)` }
        ], {
            duration: speed,
            fill: 'forwards'
        });
    }
});
