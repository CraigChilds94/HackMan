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

        for(index in game.world.collectables) {
            var collectable = game.world.collectables[index];
            checkCollision(game.world.player, collectable);
        }

        // render the root container
        renderer.render(stage);
    }

    function createGameObjects()
    {
        // Create a player and add it to the stage
        game.world.player = new Player(game.world, {x: 1, y: 1});
        stage.addChild(game.world.player.sprite);

        game.world.collectables = [
            new Collectable(game.world, {x: 400, y: 400})
        ];

        for (var i = 0; i < game.world.collectables.length; i++) {
            stage.addChild(game.world.collectables[i].sprite);
        }
    }

    function checkCollision(object1, object2)
    {
        var sprite1 = object1.sprite;
        var sprite2 = object2.sprite;

        var xdist = sprite1.x - sprite2.x;

		if(xdist > -sprite1.width && xdist < sprite1.width)
		{
			var ydist = sprite1.position.y - sprite2.position.y;

			if(ydist > -sprite1.height && ydist < sprite1.height)
			{
				object1.onCollision(object2);
                object2.onCollision(object1);
			}
		}
    }

});
