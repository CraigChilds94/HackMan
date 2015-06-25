document.addEventListener("DOMContentLoaded", function() {
    // Use WebGL
    var renderer = new PIXI.WebGLRenderer(800, 600);

    // Add the render view to the body
    document.body.appendChild(renderer.view);

    // Create Game stage
    var stage = new PIXI.Container();

    // Hold world data
    var world = {
        stage: stage,
        PIXI: PIXI
    };

    // Create the game object
    var game = new Game(world);

    // Create a player and add it to the stage
    game.world.player = new Player(game.world, {x: 0, y: 0});
    stage.addChild(game.world.player.sprite);

    // actually render
    render();

    function render() {
        requestAnimationFrame(render);

        // render the root container
        renderer.render(stage);
    }
});
