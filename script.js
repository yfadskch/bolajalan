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

        // **障碍物布局映射到图片中的点**
        var obstacles = [
            // 示例：在实际代码中用你图片中点的实际坐标替换这些坐标
            { x: 100, y: 200 }, { x: 120, y: 250 }, { x: 140, y: 300 },
            { x: 160, y: 350 }, { x: 180, y: 400 }, { x: 200, y: 450 }
        ];

        obstacles.forEach(pos => {
            let obstacle = Bodies.circle(pos.x, pos.y, 10, {
                isStatic: true, // 确保障碍物是静止的
                render: { fillStyle: 'black' }
            });
            World.add(world, obstacle);
        });

        // **创建自由落体的小球**
        var ball = Bodies.circle(384, 50, 5, {
            density: 0.04,
            friction: 0.01,
            restitution: 0.8,
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        // **运行引擎和渲染器**
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }
});
