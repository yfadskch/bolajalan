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

        // 创建障碍物，随机摆放
        var numberOfObstacles = 150; // 可以调整障碍物的总数
        for (let i = 0; i < numberOfObstacles; i++) {
            let x = Math.random() * render.options.width;
            let y = Math.random() * (render.options.height - 50) + 50; // 避免太接近顶部
            let obstacle = Bodies.circle(x, y, 10, {
                isStatic: true,
                render: { fillStyle: 'black' }
            });
            World.add(world, obstacle);
        }

        // 创建球体，尺寸为5px半径
        var ball = Bodies.circle(328, 30, 5, { // 将球的起始位置调整为容器中心
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
