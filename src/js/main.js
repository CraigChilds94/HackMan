document.addEventListener("DOMContentLoaded", function() {
    // Use WebGL
    var renderer = new PIXI.WebGLRenderer(800, 600);

    var status = {
        score : 0,
        lives : 3,
        removeLife : function() {
            status.lives--;
            $('#lives').text(status.lives)
        }
    };

    // Add the render view to the body
    document.getElementById('canvas').appendChild(renderer.view);

    // Create Game stage
    var stage = new PIXI.Container();

    // Hold world data
    var world = {
        status: status,
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

        var collidables = game.world.collectables.concat(game.world.ghosts);

        for(index in collidables) {            
            checkCollision(game.world.player, collidables[index]);
        }

        // render the root container
        renderer.render(stage);
    }

    function createGameObjects()
    {
        // Create a player and add it to the stage
        game.world.player = new Player(game.world, {x: 1, y: 1});
        stage.addChild(game.world.player.sprite);

        game.world.ghosts = [
            new Ghost(game.world, {x: 200, y: 200})
        ];

        game.world.collectables = [
            new Collectable(game.world, {x: 400, y: 400})
        ];
        
        var objs = game.world.collectables.concat(game.world.ghosts);

        for (var i = 0; i < objs.length; i++) {
            stage.addChild(objs[i].sprite);
        }
    }

    function checkCollision(player, collidable)
    {
        var sprite1 = player.sprite;
        var sprite2 = collidable.sprite;

        var xdist = sprite1.x - sprite2.x;

        var collidingWith = player.collidingWith.indexOf(collidable) !== -1

        if(xdist > -sprite1.width && xdist < sprite1.width)
        {
            var ydist = sprite1.position.y - sprite2.position.y;

            if(ydist > -sprite1.height && ydist < sprite1.height)
            {
                if (!collidingWith) {
    				collidable.onCollision(player);
                    player.collidingWith.push(collidable);
                }
                return;                    
            }
        }
        if (collidingWith) {
            player.collidingWith.splice(player.collidingWith.indexOf(collidable),1);            
        }
    }

});
