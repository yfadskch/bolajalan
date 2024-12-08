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

        // 精确调整障碍物布局
        var offsetX = 50;  // 图片中的左侧起始位置
        var offsetY = 50;  // 图片中的顶部起始位置
        var spacingX = 40; // 图片中障碍物的水平间距
        var spacingY = 40; // 图片中障碍物的垂直间距
        var rows = 20;     // 图片中障碍物的总行数
        var cols = 12;     // 图片中障碍物的总列数

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = offsetX + j * spacingX;
                let y = offsetY + i * spacingY;
                let obstacle = Bodies.circle(x, y, 10, {
                    isStatic: true,
                    render: { fillStyle: 'black' }
                });
                World.add(world, obstacle);
            }
        }

        // 创建小球
        var ball = Bodies.circle(384, 30, 5, { // 小球半径为5
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
