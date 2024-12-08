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
                wireframes: false
            }
        });

        // 创建障碍物
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 7; j++) {
                let x = 110 + j * 100;
                let y = 100 + i * 120;
                let obstacle = Bodies.circle(x, y, 20, { isStatic: true, render: { fillStyle: 'black' } });
                World.add(world, obstacle);
            }
        }

        // 创建球体
        var ball = Bodies.circle(384, 50, 20, {
            density: 0.04,
            friction: 0.01,
            restitution: 0.8, // 弹性
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        // 运行引擎和渲染器
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }
});
