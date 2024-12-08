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

        // 添加障碍物，根据图片布局
        var obstacles = [
            { x: 100, y: 200 }, { x: 150, y: 300 }, { x: 200, y: 400 }, // 根据图片调整位置
            { x: 250, y: 500 }, { x: 300, y: 600 }, { x: 350, y: 700 },
        ];

        obstacles.forEach(pos => {
            let obstacle = Bodies.circle(pos.x, pos.y, 10, {
                isStatic: true,
                render: { fillStyle: 'black' }
            });
            World.add(world, obstacle);
        });

        // 创建小球
        var ball = Bodies.circle(384, 50, 5, {
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
