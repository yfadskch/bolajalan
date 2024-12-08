document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('startGame');
    startButton.addEventListener('click', startGame);

    function startGame() {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Runner = Matter.Runner;

        var engine = Engine.create(),
            world = engine.world;

        var render = Render.create({
            element: document.getElementById('gameContainer'),
            engine: engine,
            options: {
                width: 768,
                height: 1365,
                wireframes: false,
                background: 'transparent'
            }
        });

        var offsetX = 48;  // 左侧开始位置
        var offsetY = 100; // 顶部开始位置
        var spacingX = 16; // 水平间距
        var spacingY = 16; // 垂直间距
        var rows = 29;     // 行数
        var cols = 13;     // 列数

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = offsetX + j * spacingX;
                let y = offsetY + i * spacingY;
                let obstacle = Bodies.circle(x, y, 8, {
                    isStatic: true,
                    render: { fillStyle: 'black' }
                });
                World.add(world, obstacle);
            }
        }

        var ball = Bodies.circle(384, 50, 2, {
            density: 0.04,
            friction: 0.01,
            restitution: 0.8,
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }
});
