document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const balls = [];

    function createDots(rows) {
        let xOffset = 300;
        let yOffset = 30;
        for (let row = 0; row < rows; row++) {
            for (let i = 0; i <= row; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.style.left = `${xOffset - (row * 10) + (i * 20)}px`;
                dot.style.top = `${yOffset + (row * 20)}px`;
                container.appendChild(dot);
            }
        }
    }

    function createBalls() {
        const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'cyan', 'pink'];
        for (let i = 0; i < 8; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.style.backgroundColor = colors[i];
            ball.style.left = `${(i * 70) + 10}px`;
            container.appendChild(ball);
            balls.push(ball);
        }
    }

    document.getElementById('startButton').addEventListener('click', function() {
        balls.forEach(ball => {
            let speed = 0;
            const fallInterval = setInterval(function() {
                speed += 5; // 逐渐增加速度
                let ballTop = parseInt(ball.style.top.replace('px', ''));
                ball.style.top = `${ballTop + speed * 0.05}px`; // 计算新的顶部位置

                if (parseInt(ball.style.top) >= 800) { // 到达底部
                    clearInterval(fallInterval); // 停止下落
                }
            }, 20);
        });
    });

    createDots(15); // 生成点
    createBalls(); // 生成球
});
