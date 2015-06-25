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

    var bg = new world.PIXI.Sprite.fromImage('/src/img/map1.png');
    stage.addChild(bg);

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

        for(index in game.world.walls) {
            game.world.walls[index].checkPlayerCollision();
        }

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
        game.world.walls = [
            new Wall(game.world, {x:200, y:200, width: 50, height: 50})
        ];

        for(index in game.world.walls) {
            stage.addChild(game.world.walls[index].rectangle);
        }

        // Create a player and add it to the stage
        game.world.player = new Player(game.world, {x: 1, y: 1});
        stage.addChild(game.world.player.sprite);

        game.world.ghosts = [
            new Ghost(game.world, {x: 200, y: 200})
        ];

        game.world.collectables = [
            //This should be the super collectable
            // new Collectable(game.world, {x: 400, y: 400})
        ];
        
        generateCollectables([
            [0,1,1,1,1,0,0,0],
            [1,1,1,1,1,1,1,1]
        ]);
        
        var objs = game.world.collectables.concat(game.world.ghosts);

        for (index in objs) {
            stage.addChild(objs[index].sprite);
        }
    }

    function generateCollectables(arr) {

        var colWidth = 150;

        for (y in arr) {
            for (x in arr[y]) {
                if (arr[y][x] == 1) {
                    var tmp = new Collectable(game.world,{x: x*colWidth, y: y*colWidth});
                    game.world.collectables.push(tmp);
                    stage.addChild(tmp.sprite);                    
                }
            }
        }

    }

    function checkCollision(player, collidable)
    {
        var sprite1 = player.sprite;
        var sprite2 = collidable.sprite;

        var xdist = sprite1.x - sprite2.x;

        var collidingWith = player.collidingWith.indexOf(collidable) !== -1;

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
