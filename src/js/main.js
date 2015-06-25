document.addEventListener("DOMContentLoaded", function() {
    // Use WebGL
    var renderer = new PIXI.WebGLRenderer(800, 600);

    // Add the render view to the body
    document.getElementById('canvas').appendChild(renderer.view);

    // Create Game stage
    var stage = new PIXI.Container();

    // Hold world data
    var world = {
        stage: stage,
        PIXI: PIXI
    };

    // Create the game object
    var game = new Game(world);

    // Create our objectss
    createGameObjects();

    // Bind the game events after we've created everything
    game.bindEvents();

    setTimeout(function() {
        // actually render
        render();
    }, 1000);

    function render() {
        requestAnimationFrame(render);

        game.world.player.update();

        // render the root container
        renderer.render(stage);
    }

    function createGameObjects()
    {
        // Create a player and add it to the stage
        game.world.player = new Player(game.world, {x: 1, y: 1});
        stage.addChild(game.world.player.sprite);
    }
});
