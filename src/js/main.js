document.addEventListener("DOMContentLoaded", function() {
    // Use WebGL
    var renderer = new PIXI.WebGLRenderer(800, 600);

    var status = {
        score : 0,
        lives : 3,
        removeLife : function() {
            status.lives--;
            $('#lives').text(status.lives);
        },
        addPoints : function(points) {
            status.score += points;
            $('#score').text(status.score);
        }
    };

    $('#high-score').text(window.localStorage.getItem('high-score') || 0);

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

    var drinkingDelay = 30000;
    var drinkText = function() {

        var message = "Drink Now.";

        var style = {
            font: '70px courier new',
            fill: '#ffffff'
        };

        var text = new PIXI.Text(message, style);
        text.x = 230;
        text.y = 200;

        if(world.status.lives > 0) {
            world.stage.addChild(text);
            world.player.canMove = false;

            $(document).on('keydown', function(e) {
                e = e || window.event;
                if (e.keyCode == '32') {
                    world.player.drinking = true;

                    setTimeout(function () {
                        world.stage.removeChild(text);
                    }, 1000);
                }
            });

            $(document).on('keyup', function(e) {
                e = e || window.event;
                if (e.keyCode == '32') {

                    if(world.player.drinking) {
                        world.player.canMove = true;
                        world.player.drinking = false;
                    }
                }
            });
        } else {
            world.stage.removeChild(text);
        }
    };

    var interval = setInterval(drinkText, drinkingDelay);

    // var bg = new world.PIXI.Sprite.fromImage('/src/img/map1.png');
    // stage.addChild(bg);

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

    setInterval(addGhost, 5000);

    function render() {
        requestAnimationFrame(render);

        for(index in game.world.walls) {
            game.world.walls[index].checkPlayerCollision();
            game.world.walls[index].checkGhostCollision();
        }

        game.world.player.update();

        var collidables = game.world.collectables.concat(game.world.ghosts);

        for(index in collidables) {
            checkCollision(game.world.player, collidables[index]);
            collidables[index].update();
        }

        // render the root container
        renderer.render(stage);
    }

    function addGhost()
    {
        var types = ['pol', 'fbi', 'nsa'];
        var index = Math.floor( (Math.random() * 3));
        var ghost = new Ghost(game.world, {x: 105, y: 55}, types[index]);

        game.world.stage.addChild(ghost.sprite);
        game.world.ghosts.push(ghost);
    }

    function createGameObjects()
    {

        // Create a player and add it to the stage
        game.world.player = new Player(game.world, {x: 220, y: 250});

        game.world.walls = [
            // Top & bottom walls
            new Wall(game.world, {x:100, y:50, width: 600, height: 3}),
            new Wall(game.world, {x:100, y:550, width: 600, height: 3}),

            // Side walls
            new Wall(game.world, {x:100, y:50, width: 3, height: 170}),
            new Wall(game.world, {x:100, y:380, width: 3, height: 170}),
            new Wall(game.world, {x:700, y:50, width: 3, height: 173}),
            new Wall(game.world, {x:700, y:380, width: 3, height: 173}),

            // Exit walls
            new Wall(game.world, {x:100, y:380, width: 110, height: 3}),
            new Wall(game.world, {x:100, y:220, width: 110, height: 3}),
            new Wall(game.world, {x:590, y:380, width: 110, height: 3}),
            new Wall(game.world, {x:590, y:220, width: 110, height: 3}),
            new Wall(game.world, {x:100, y:330, width: 110, height: 3}),
            new Wall(game.world, {x:100, y:270, width: 110, height: 3}),
            new Wall(game.world, {x:590, y:330, width: 110, height: 3}),
            new Wall(game.world, {x:590, y:270, width: 110, height: 3}),
            new Wall(game.world, {x:210, y:330, width: 3, height: 53}),
            new Wall(game.world, {x:210, y:220, width: 3, height: 53}),
            new Wall(game.world, {x:590, y:330, width: 3, height: 53}),
            new Wall(game.world, {x:590, y:220, width: 3, height: 53}),

            // Box
            new Wall(game.world, {x:317, y:260, width: 3, height: 80}),
            new Wall(game.world, {x:481, y:260, width: 3, height: 80}),
            new Wall(game.world, {x:317, y:340, width: 167, height: 3}),
            new Wall(game.world, {x:317, y:260, width: 50, height: 3}),
            new Wall(game.world, {x:431, y:260, width: 50, height: 3}),

            // Internal walls
            new Wall(game.world, {x:395, y:50, width: 10, height:60}),
            new Wall(game.world, {x:395, y:490, width: 10, height:60}),

            new Wall(game.world, {x:335, y:490, width: 60, height:10}),
            new Wall(game.world, {x:405, y:490, width: 60, height:10}),

            new Wall(game.world, {x:150, y:100, width: 180, height:10}),
            new Wall(game.world, {x:465, y:100, width: 180, height:10}),

            new Wall(game.world, {x:150, y:155, width: 60, height:10}),
            new Wall(game.world, {x:595, y:155, width: 60, height:10}),

            new Wall(game.world, {x:150, y: 490, width: 120, height:10}),
            new Wall(game.world, {x:525, y: 490, width: 120, height:10}),

            new Wall(game.world, {x:210, y: 430, width: 130, height:10}),
            new Wall(game.world, {x:455, y: 430, width: 130, height:10}),

            new Wall(game.world, {x:315, y:380, width: 90, height:10}),
            new Wall(game.world, {x:395, y:380, width: 90, height:10}),

            new Wall(game.world, {x:270, y:215, width: 70, height:10}),
            new Wall(game.world, {x:455, y:215, width: 80, height:10}),

            new Wall(game.world, {x:315, y:155, width: 90, height:10}),
            new Wall(game.world, {x:395, y:155, width: 90, height:10}),

            new Wall(game.world, {x:395, y:160, width: 10, height:60}),
            new Wall(game.world, {x:150, y:430, width: 10, height:60}),

            new Wall(game.world, {x:635, y:430, width: 10, height:60}),
            new Wall(game.world, {x:395, y:390, width: 10, height:60}),

            new Wall(game.world, {x:260, y:330, width: 10, height:105}),
            new Wall(game.world, {x:530, y:330, width: 10, height:105}),

            new Wall(game.world, {x:260, y:170, width: 10, height:105}),
            new Wall(game.world, {x:530, y:170, width: 10, height:105}),
        ];

        game.world.ghosts = [
            new Ghost(game.world, {x: 105, y: 55},'pol'),
            new Ghost(game.world, {x: 655, y: 55},'fbi'),
            new Ghost(game.world, {x: 105, y: 455},'nsa')
        ];

        for(index in game.world.walls) {
            stage.addChild(game.world.walls[index].rectangle);
            // game.world.walls[index].checkPlayerCollision();
            // game.world.walls[index].checkGhostCollision();
        }

        stage.addChild(game.world.player.sprite);
        game.world.player.animate();


        game.world.collectables = [
            //This should be the super collectable
            new Collectable(game.world, {x: 110, y: 60},'beer'),
            new Collectable(game.world, {x: 160, y: 65}),
            new Collectable(game.world, {x: 200, y: 65}),
            new Collectable(game.world, {x: 240, y: 65}),
            new Collectable(game.world, {x: 280, y: 65}),
            new Collectable(game.world, {x: 320, y: 65}),
            new Collectable(game.world, {x: 360, y: 65}),
            new Collectable(game.world, {x: 420, y: 65}),
            new Collectable(game.world, {x: 460, y: 65}),
            new Collectable(game.world, {x: 500, y: 65}),
            new Collectable(game.world, {x: 540, y: 65}),
            new Collectable(game.world, {x: 580, y: 65}),
            new Collectable(game.world, {x: 620, y: 65}),
            new Collectable(game.world, {x: 660, y: 65},'beer'),
            new Collectable(game.world, {x: 120, y: 125}),
            new Collectable(game.world, {x: 160, y: 125}),
            new Collectable(game.world, {x: 200, y: 125}),
            new Collectable(game.world, {x: 240, y: 125}),
            new Collectable(game.world, {x: 280, y: 125}),
            new Collectable(game.world, {x: 320, y: 125}),
            new Collectable(game.world, {x: 360, y: 125}),
            new Collectable(game.world, {x: 420, y: 125}),
            new Collectable(game.world, {x: 460, y: 125}),
            new Collectable(game.world, {x: 500, y: 125}),
            new Collectable(game.world, {x: 540, y: 125}),
            new Collectable(game.world, {x: 580, y: 125}),
            new Collectable(game.world, {x: 620, y: 125}),
            new Collectable(game.world, {x: 660, y: 125}),
            new Collectable(game.world, {x: 120, y: 185}),
            new Collectable(game.world, {x: 160, y: 185}),
            new Collectable(game.world, {x: 200, y: 185}),
            new Collectable(game.world, {x: 240, y: 185}),
            new Collectable(game.world, {x: 280, y: 185}),
            new Collectable(game.world, {x: 320, y: 185}),
            new Collectable(game.world, {x: 360, y: 185}),
            new Collectable(game.world, {x: 420, y: 185}),
            new Collectable(game.world, {x: 460, y: 185}),
            new Collectable(game.world, {x: 500, y: 185}),
            new Collectable(game.world, {x: 540, y: 185}),
            new Collectable(game.world, {x: 580, y: 185}),
            new Collectable(game.world, {x: 620, y: 185}),
            new Collectable(game.world, {x: 660, y: 185}),
            new Collectable(game.world, {x: 240, y: 245}),
            new Collectable(game.world, {x: 280, y: 245}),
            new Collectable(game.world, {x: 320, y: 245}),
            new Collectable(game.world, {x: 360, y: 245}),
            new Collectable(game.world, {x: 420, y: 245}),
            new Collectable(game.world, {x: 460, y: 245}),
            new Collectable(game.world, {x: 500, y: 245}),
            new Collectable(game.world, {x: 540, y: 245}),
            new Collectable(game.world, {x: 580, y: 245}),
            new Collectable(game.world, {x: 160, y: 305}),
            new Collectable(game.world, {x: 200, y: 305}),
            new Collectable(game.world, {x: 240, y: 305}),
            new Collectable(game.world, {x: 280, y: 305}),
            new Collectable(game.world, {x: 320, y: 280},'data-mine'),
            new Collectable(game.world, {x: 360, y: 280},'data-mine'),
            new Collectable(game.world, {x: 400, y: 280},'data-mine'),
            new Collectable(game.world, {x: 440, y: 280},'data-mine'),
            new Collectable(game.world, {x: 500, y: 305}),
            new Collectable(game.world, {x: 540, y: 305}),
            new Collectable(game.world, {x: 580, y: 305}),
            new Collectable(game.world, {x: 620, y: 305}),
            new Collectable(game.world, {x: 660, y: 305}),
            new Collectable(game.world, {x: 240, y: 365}),
            new Collectable(game.world, {x: 280, y: 365}),
            new Collectable(game.world, {x: 320, y: 365}),
            new Collectable(game.world, {x: 360, y: 365}),
            new Collectable(game.world, {x: 420, y: 365}),
            new Collectable(game.world, {x: 460, y: 365}),
            new Collectable(game.world, {x: 500, y: 365}),
            new Collectable(game.world, {x: 540, y: 365}),
            new Collectable(game.world, {x: 580, y: 365}),
            new Collectable(game.world, {x: 120, y: 405}),
            new Collectable(game.world, {x: 160, y: 405}),
            new Collectable(game.world, {x: 200, y: 405}),
            new Collectable(game.world, {x: 240, y: 405}),
            new Collectable(game.world, {x: 280, y: 405}),
            new Collectable(game.world, {x: 320, y: 405}),
            new Collectable(game.world, {x: 360, y: 405}),
            new Collectable(game.world, {x: 420, y: 405}),
            new Collectable(game.world, {x: 460, y: 405}),
            new Collectable(game.world, {x: 500, y: 405}),
            new Collectable(game.world, {x: 540, y: 405}),
            new Collectable(game.world, {x: 580, y: 405}),
            new Collectable(game.world, {x: 620, y: 405}),
            new Collectable(game.world, {x: 660, y: 405}),
            new Collectable(game.world, {x: 120, y: 470}),
            new Collectable(game.world, {x: 160, y: 470}),
            new Collectable(game.world, {x: 200, y: 470}),
            new Collectable(game.world, {x: 240, y: 470}),
            new Collectable(game.world, {x: 280, y: 470}),
            new Collectable(game.world, {x: 320, y: 470}),
            new Collectable(game.world, {x: 360, y: 470}),
            new Collectable(game.world, {x: 420, y: 470}),
            new Collectable(game.world, {x: 460, y: 470}),
            new Collectable(game.world, {x: 500, y: 470}),
            new Collectable(game.world, {x: 540, y: 470}),
            new Collectable(game.world, {x: 580, y: 470}),
            new Collectable(game.world, {x: 620, y: 470}),
            new Collectable(game.world, {x: 660, y: 470}),
            new Collectable(game.world, {x: 110, y: 500},'beer'),
            new Collectable(game.world, {x: 160, y: 525}),
            new Collectable(game.world, {x: 200, y: 525}),
            new Collectable(game.world, {x: 240, y: 525}),
            new Collectable(game.world, {x: 280, y: 525}),
            new Collectable(game.world, {x: 320, y: 525}),
            new Collectable(game.world, {x: 360, y: 525}),
            new Collectable(game.world, {x: 420, y: 525}),
            new Collectable(game.world, {x: 460, y: 525}),
            new Collectable(game.world, {x: 500, y: 525}),
            new Collectable(game.world, {x: 540, y: 525}),
            new Collectable(game.world, {x: 580, y: 525}),
            new Collectable(game.world, {x: 620, y: 525}),
            new Collectable(game.world, {x: 660, y: 500},'beer'),
        ];

        var objs = game.world.ghosts.concat(game.world.collectables);

        for (index in objs) {
            stage.addChild(objs[index].sprite);
        }
    }

    function generateCollectables(arr) {

        var colWidth = 50;

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
