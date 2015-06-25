var Ghost = (function(world, position, type) {

    var sprite;

    switch(type)
    {
        case "pol":
            sprite = new world.PIXI.Sprite.fromImage('/src/img/pol-r.png');
            break;
        case "fbi":
            sprite = new world.PIXI.Sprite.fromImage('/src/img/fbi-r.png');
            break;
        case "nsa":
            sprite = new world.PIXI.Sprite.fromImage('/src/img/nsa-r.png');
            break;
    }

    var hitWall = false;

    // deltas
    var delta = {
        x: 0,
        y: 1
    };

    sprite.scale = {x: 0.9, y: 0.9};

    // Reset the position of the sprite
    sprite.position = position;

    // Handle updating the player
    function update()
    {
        if(!this.hitWall && inBounds()) {
            sprite.position.x += delta.x;
            sprite.position.y += delta.y;
        }
        else {
        	delta.x = getRandomDelta();
        	delta.y = 0;

            while(delta.y == 0 && delta.x == 0) {
                delta.y = getRandomDelta();
            }
        }
    }

    function getRandomDelta() {
    	return Math.floor( (Math.random() * 3) - 1 );
    }

    // Check if player in bounds
    function inBounds()
    {
        var xPos = sprite.position.x + delta.x;
        var yPos = sprite.position.y + delta.y;

        return (xPos >= 0 && xPos + sprite.width <= 800)
            && (yPos >= 0 && yPos + sprite.height <= 600);
    }

    function onCollision() {
    	world.status.removeLife();
        world.player.die();
    }

    // Return public data
    return {
        sprite: sprite,
        speed: 5,
        delta: delta,
        update: update,
        onCollision: onCollision,
        collidingWith: [],
        hitWall: hitWall
    };

});
