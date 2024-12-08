document.getElementById('startButton').addEventListener('click', function() {
    let tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        let ball = document.createElement('div');
        ball.style.width = '20px';
        ball.style.height = '20px';
        ball.style.backgroundColor = track.style.backgroundColor;
        ball.style.position = 'absolute';
        ball.style.borderRadius = '50%';
        ball.style.top = '-20px';
        track.appendChild(ball);

        // Animate the ball
        let distance = track.clientHeight;
        let speed = Math.random() * 5000 + 2000;  // Random speed for each ball
        ball.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(${distance}px)` }
        ], {
            duration: speed,
            fill: 'forwards'
        });
    });
});
