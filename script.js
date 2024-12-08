document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('startGame');
    var obstacles = []; // 保存障碍物的数组

    startButton.addEventListener('click', function () {
        removeObstacles(); // 按下按钮后移除障碍物
        startGame();       // 开始游戏
    });

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

        // 障碍物的布局
        var offsetX = 65;  // 左侧起始位置
        var offsetY = 120; // 顶部起始位置
        var spacingX = 50; // 水平间距
        var spacingY = 50; // 垂直间距
        var rows = 25;     // 障碍物的总行数
        var cols = 13;     // 障碍物的总列数

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = offsetX + j * spacingX;
                let y = offsetY + i * spacingY;
                let obstacle = Bodies.circle(x, y, 10, {
                    isStatic: true,
                    render: { fillStyle: 'black' }
                });
                obstacles.push(obstacle); // 添加到障碍物数组
                World.add(world, obstacle);
            }
        }

        // 创建自由落体的小球
        var ball = Bodies.circle(384, 30, 5, {
            density: 0.04,
            friction: 0.01,
            restitution: 0.8,
            render: { fillStyle: 'red' }
        });

        World.add(world, ball);

        // 运行引擎和渲染器
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);
    }

    function removeObstacles() {
        // 遍历障碍物数组并从世界中移除
        for (let obstacle of obstacles) {
            Matter.World.remove(engine.world, obstacle);
        }
        obstacles = []; // 清空数组
    }
});
