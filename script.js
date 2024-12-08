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
                width: 656,
                height: 799,
                wireframes: false,
                background: 'transparent'
            }
        });

        // 创建随机摆放的障碍物
        var numberOfObstacles = 150;
        for (let i = 0; i < numberOfObstacles; i++) {
            let x = Math.random() * render.options.width;
            let y = Math.random() * (render.options.height - 50) + 50;
            let obstacle = Bodies.circle(x, y, 10, {
                isStatic: true,
                render: { fillStyle: 'black' }
            });
            World.add(world, obstacle);
        }

        // 创建小球，尺寸为2px半径
        var ball = Bodies.circle(328, 30, 2, { 
            density: 0.04,
            friction: 0.01,
            restitution: 0.8,
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        console.log("Ball radius: " + ball.circleRadius);
        console.log("Obstacle radius: 10");

        // 运行引擎和渲染器
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }
});
