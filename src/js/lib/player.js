var Player = (function(world, position) {
    var hitWall = false;

    // deltas
    var delta = {
        x: 0,
        y: 1
    };

    var animating = true;
    var currentImage = 0;
    var imageType = 'thin';
    var direction = 'r';

    // Load in a player image
    var images = [
        PIXI.Texture.fromImage('/src/img/hm-thin-r.png'),
        PIXI.Texture.fromImage('/src/img/hm-wide-r.png'),
        PIXI.Texture.fromImage('/src/img/hm-thin-l.png'),
        PIXI.Texture.fromImage('/src/img/hm-wide-l.png'),
        PIXI.Texture.fromImage('/src/img/hm-thin-u.png'),
        PIXI.Texture.fromImage('/src/img/hm-wide-u.png'),
        PIXI.Texture.fromImage('/src/img/hm-thin-d.png'),
        PIXI.Texture.fromImage('/src/img/hm-wide-d.png'),
    ];
    var sprite = new world.PIXI.Sprite(images[0]);

    var canMove = true;

    // Reset the position of the sprite
    sprite.position = position;

    sprite.scale = {x: 0.8, y: 0.8};

    function animate()
    {
        var wagga = false;
        setInterval(function() {
            console.log('hello');
            if(!animating) return;

            wagga = !wagga;

            if(wagga) {
                if(world.player.direction == 'r') {
                    world.player.sprite.texture = images[0];
                } else if(world.player.direction == 'l') {
                    world.player.sprite.texture = images[2];
                } else if(world.player.direction == 'u') {
                    world.player.sprite.texture = images[4];
                } else if(world.player.direction == 'd') {
                    world.player.sprite.texture = images[6];
                }
            } else {
                if(world.player.direction == 'r') {
                    world.player.sprite.texture = images[1];
                } else if(world.player.direction == 'l') {
                    world.player.sprite.texture = images[3];
                } else if(world.player.direction == 'u') {
                    world.player.sprite.texture = images[5];
                } else if(world.player.direction == 'd') {
                    world.player.sprite.texture = images[7];
                }
            }

        }, 200);
    }

    // Handle updating the player
    function update()
    {
        if(world.player.canMove) {
            if(!world.player.hitWall && inBounds()) {
                sprite.position.x += delta.x;
                sprite.position.y += delta.y;
            }
        }
    }

    // Check if player in bounds
    function inBounds()
    {
        var xPos = sprite.position.x + delta.x;
        var yPos = sprite.position.y + delta.y;

        return (xPos >= 0 && xPos + sprite.width <= 800)
            && (yPos >= 0 && yPos + sprite.height <= 600);
    }

    // Return public data
    return {
        sprite: sprite,
        speed: 5,
        delta: delta,
        update: update,
        collidingWith: [],
        hitWall: hitWall,
        canMove: canMove,
        drinking: false,
        animate: animate,
        direction: direction
    };

});
