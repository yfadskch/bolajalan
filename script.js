document.getElementById('startGame').addEventListener('click', function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Events = Matter.Events;

    var engine = Engine.create(),
        world = engine.world;

    var render = Render.create({
        element: document.getElementById('gameContainer'),
        engine: engine,
        options: {
            width: 768,
            height: 1365,
            wireframes: false // 设置为false以显示样式化的渲染
        }
    });

    // 创建障碍物
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 7; j++) {
            let x = 110 + j * 100;
            let y = 100 + i * 120;
            let obstacle = Bodies.circle(x, y, 20, { isStatic: true });
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

    // 添加运动的球
    Events.on(engine, 'beforeUpdate', function(event) {
        Body.setVelocity(ball, { x: 0, y: +10 }); // 向下运动
    });

    // 运行引擎和渲染器
    Engine.run(engine);
    Render.run(render);
});
