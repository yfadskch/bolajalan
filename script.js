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

        // 根据新的图片设计创建障碍物
        var offsetX = 50; // 适当调整以匹配图片中的布局
        var offsetY = 50;
        var spacingX = 50;
        var spacingY = 50;
        var rows = 19;
        var cols = 10;

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

        // 创建球体
        var ball = Bodies.circle(384, 50, 20, {
            density: 0.04,
            friction: 0.01,
            restitution: 0.8, // 高弹性
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        // 运行引擎和渲染器
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }
});
